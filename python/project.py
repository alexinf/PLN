from textblob import TextBlob
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import flask
from flask import request, jsonify
import mysql.connector
import time
from flask_cors import CORS

try:
    conexion_db = mysql.connector.connect(
        host="localhost", user="alex", passwd="Hola1234.", database="ia2proyectos")
    print("--- Conexión a DB exitosa ---")
except:
    print("Error en la Conexión a la DB")

listaObras = {"asphalted": "asfaltado",
              "asphalt": "asfaltado",
              "lighting": "alumbrado",
              "paved": "empedrado",
              "hospital": "hospital",
              "post": "posta",
              "potholes": "baches",
              "bridge": "puente",
              "school": "colegio",
              "Park": "parque",
              "sewerage": "alcantarillado",
              "Water": "agua",
              "distributor": "distribuidor",
              "traffic light": "semaforo",
              "court": "cancha",
              "soccer": "futbol",
              "highway": "carretera",
              "avenue": "avenida",
              "terminal": "terminal",
              "train": "tren",
              "irrigation": "riego"
              }


def analizador(texto):
    analisisDeTexto = TextBlob(texto)

    traduccionDeTexto = analisisDeTexto.translate(to='en')

    analizadorDeSentimientos = SentimentIntensityAnalyzer()
    resultadosDeSentimientos = analizadorDeSentimientos.polarity_scores(
        traduccionDeTexto)
    return resultadosDeSentimientos


def insertar_calificacion(comentario, proyectoid):
    consulta = "INSERT INTO estado (positivo, neutral, negativo, fecha, proyectos_id) VALUES (%s, %s, %s, %s, %s)"
    cursor = conexion_db.cursor(buffered=True)
    positivo = neutral = negativo = 0
    fecha = time.strftime('%Y-%m-%d %H:%M:%S')
    resultados = analizador(comentario)
    positivo = resultados['pos']
    negativo = resultados['neg']
    neutral = resultados['neu']
    datos = (positivo, neutral, negativo, fecha, proyectoid)
    cursor.execute(consulta, datos)
    conexion_db.commit()
    cursor.close()
    return resultados


def obtener_resumenCalif(proyectoid):
    
    consulta = "SELECT positivo, negativo, neutral, fecha FROM estado WHERE proyectos_id="+str(proyectoid)  # + \
    print(consulta)
    cursor = conexion_db.cursor(buffered=True)
    cursor.execute(consulta)
    resultados = cursor.fetchall()
    print(resultados)
    consultaNombre = "SELECT nombre FROM proyectos WHERE proyectos_id={}".format(
        proyectoid)
    cursor.execute(consultaNombre)
    nombre = cursor.fetchone()[0]
    jsonificado = {"proyectoid": proyectoid,
                   "proyectonombre": nombre, "datos": []}
    for dato in resultados:
        jsonificado['datos'].append({"fecha": dato[3].strftime(
            '%Y-%m-%d %H:%M:%S'), "calificaciones": {"pos": dato[0], "neg": dato[1], "neu": dato[2]}})

    cursor.close()
    return jsonificado
    
def clasificarPedido(pedido, localidad):
    pedidoBlob = TextBlob(pedido)
    pedidoTraducido = pedidoBlob.translate(to='en')
    print(pedidoTraducido)
    clasificacionNouns = (sustantivo for sustantivo,
                          tag in pedidoTraducido.tags if tag == 'NN')
    listaNouns = []
    for item in clasificacionNouns:
        listaNouns.append(item)

    for item in listaNouns:
        if(listaObras.get(item) != None):
            anadirPedido(item, localidad)


def anadirPedido(pedido, localidad):
    consulta = "INSERT INTO pedidos (pedido, localidad, fecha) VALUES (%s, %s, %s)"
    cursor = conexion_db.cursor(buffered=True)
    pedido = listaObras.get(pedido)
    fecha = time.strftime('%Y-%m-%d %H:%M:%S')
    datos = (pedido, localidad, fecha)
    cursor.execute(consulta, datos)
    conexion_db.commit()
    cursor.close()


def getPedido():
    cursor = conexion_db.cursor(buffered=True)
    consultaPedidos = "SELECT pedido,localidad,fecha, COUNT(pedido) AS total FROM pedidos GROUP BY Month(fecha), pedido"
    cursor.execute(consultaPedidos)
    resultados = cursor.fetchall()
    respuesta = {"pedidos": []}
    for dato in resultados:
        respuesta['pedidos'].append({"pedido": dato[0], "localidad": dato[1], "mes": int(
            dato[2].strftime('%m')), "total": dato[3]})

    return respuesta

app = flask.Flask(__name__)
cors = CORS(app, resources=r'/api/*')

app.config["DEBUG"] = True


@ app.route('/api/calificacion', methods=['POST'])
def api_calificacion():
    textoRecibido = request.get_json()['comentario']
    proyectoid = request.get_json()['proyectoid']
    if ('comentario' in request.get_json()) & ('proyectoid' in request.get_json()):
        textoAnalizado = insertar_calificacion(textoRecibido, proyectoid)
    else:
        return "Error: parámetro 'comentario' o 'proyectoid' no provisto. Por favor especificalos."

    return jsonify(textoAnalizado)


@ app.route('/api/calificacion/resumen', methods=['POST'])
def api_calResumen():
    proyectoid = request.get_json()['proyectoid']
    if 'proyectoid' in request.get_json():
        resultados = obtener_resumenCalif(proyectoid)
    else:
        return "Error: parámetro 'proyectoid' no provisto. Por favor especifica un id de proyecto."

    return jsonify(resultados)

@ app.route('/api/pedidos', methods=['POST'])
def api_pedidos():
    if 'pedido' in request.get_json():
        pedido = request.get_json()['pedido']
        localidad = request.get_json()['localidad']
        clasificarPedido(pedido, localidad)
    else:
        return "Error: parámetro 'pedido' no provisto. Por favor especifica un pedido de obra."

    return jsonify('Realizado Exitosamente')


@ app.route('/api/pedidos/resumen', methods=['GET'])
def api_getPedidos():
    respuesta = getPedido()

    return jsonify(respuesta)

app.run()
