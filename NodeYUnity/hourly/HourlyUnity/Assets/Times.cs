using Assets;
using System.Collections;
using TMPro;
using UnityEngine;
using UnityEngine.Networking;
public class Times : MonoBehaviour
{
    [SerializeField] private TextMeshProUGUI respuestaServicioLabel;
    [SerializeField] private GameObject popupGameObject;
    [SerializeField] private TextMeshProUGUI popupLabel;

    private bool startedCoroutine = false;

    private void Start()
    {
        popupGameObject.SetActive(false);
        respuestaServicioLabel.text = "";
    }

    public IEnumerator ConectarServicioRoutine(string url)
    {
        Debug.Log(url);
        UnityWebRequest request = UnityWebRequest.Get("http://localhost:3000/times/" + url);
        yield return request.SendWebRequest();
        if (request.isNetworkError || request.isHttpError || request.isHttpError)
        {
            Debug.Log(request.error);
            ShowHideError(request.error);
        }
        else
        {
            string jsonResponse = request.downloadHandler.text;
            Debug.Log(jsonResponse);
            Hora info = JsonUtility.FromJson<Hora>(jsonResponse);
            if (info.status.Equals("NOK"))
            {
                ShowHideError("Ha habido un error");
            }
            else{
            Debug.Log(info.ToString());
            Debug.Log("info.time = " + info.time);
            respuestaServicioLabel.text = info.time;
            }
        }
    }

    public void ConectarServicio()
    {
        Buscar("getTime");
    }

    public void ConectarServicioDia()
    {
        Buscar("getDay");
    }

    public void Buscar(string url)
    {
        // Evitar lanzar una peticion si ya se ha lanzado una
        if (startedCoroutine)
            return;

        Debug.Log("start coroutine");

        startedCoroutine = true;
        StartCoroutine(ConectarServicioRoutine(url));
        startedCoroutine = false;
    }

        public void ShowHideError(string error)
    {
        popupLabel.text = error;
        popupGameObject.SetActive(true);
    }

    public void HideError()
    {
        popupGameObject.SetActive(false);
    }
}

