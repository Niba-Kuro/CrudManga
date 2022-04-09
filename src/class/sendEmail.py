# IMPORT=====================================================================================================================
import requests
import datetime
from requests import Request, Session
# CLASS======================================================================================================================
class sendEmail:
    sendHeader                  = None
    senData                     = None
    response                    = None
    prepped                     = None
    result                      = None
    session                     = None
    urlApi                      = "https://api.emailjs.com/api/v1.0/email/send"
    method                      = "POST"
    appName                     = "CrudManga"
# INIT=======================================================================================================================
    def __init__(self, subject, exception, message, line): 
        try:
            self.sendHeader = {
                "Content-Type"      : "application/json",
                "accessToken"       : "1dy5DQ_ukvkGr8yUj9JVc",
            }

            self.senData = {
                "service_id"        : "service_dw7dxr8",
                "template_id"       : "error_4hwsrfu",
                "user_id"           : "7XOeovvdKWxFQiDWe",
                "accessToken"       : "1dy5DQ_ukvkGr8yUj9JVc",
                "template_params"   : {
                    "from"          : self.appName,
                    "subject"       : subject,
                    "exception"     : exception,
                    "message"       : message,
                    "line"          : line,
                    "date"          : str(datetime.datetime.now())
                }
            }

            self.session    = Session()
            self.response   = Request(method = self.method, url = self.urlApi, headers = self.sendHeader, json = self.senData,)
            self.prepped    = self.response.prepare()
            self.result     = self.session.send(self.prepped, stream = False, verify = True, timeout = 5)

            if (self.result.status_code == requests.codes.ok):
                print({"status": 0, "message-en": "An error email has been sent.", "message-es": "Se ha enviado un correo del error."})
            else:
                print({"status": 1, "message-en": "An error ocurred while seending the email.", "message-es": "Ha ocurrido un error al enviar el correo."})

        except Exception as ex:
            print({"status": -1, "message-en": "An error ocurred while seending the email.", "message-es": "Ha ocurrido un error al enviar el correo.\n Error: " + str(ex)})
# CLOSE CLASS================================================================================================================
# test = sendEmail("python", "exeption", "prueba", "1")