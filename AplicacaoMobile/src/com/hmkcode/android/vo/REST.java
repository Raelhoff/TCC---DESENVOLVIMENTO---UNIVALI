package com.hmkcode.android.vo;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONObject;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;
import android.app.Activity;


public class REST {	

	private static Device device = new Device();
	public String URL    = "http://192.168.25.22:4433/";
	
	public void PostService(Device kdevice){
		device = kdevice;
		new HttpAsyncTaskPOST().execute(URL);
	}	
	
	private static  String POST(String url){
		InputStream inputStream = null;
		String result = "";
		try {
			
			// 1. create HttpClient
			HttpClient httpclient = new DefaultHttpClient();
			
			// 2. make POST request to the given URL
		    HttpPost httpPost = new HttpPost(url);
		    
		    String json = "";
		    

		    JSONObject jsonObject = new JSONObject();
		    jsonObject.accumulate("Dispositivo", device.getDevice());
		    jsonObject.accumulate("Valor", device.getValor());
		    jsonObject.accumulate("Unidade",device.getUnidade());
		    jsonObject.accumulate("Data",getCurrentTimeStamp());
		    
		    // 4. convert JSONObject to JSON to String
		    json = jsonObject.toString();

		    
		    // ** Alternative way to convert Person object to JSON string usin Jackson Lib 
		    // ObjectMapper mapper = new ObjectMapper();
		    // json = mapper.writeValueAsString(person); 
		    
		    // 5. set json to StringEntity
		    StringEntity se = new StringEntity(json);
		    
		    // 6. set httpPost Entity
		    httpPost.setEntity(se);
		    
		    // 7. Set some headers to inform server about the type of the content   
		    httpPost.setHeader("Accept", "application/json");
		    httpPost.setHeader("Content-type", "application/json");
		    
			// 8. Execute POST request to the given URL
			HttpResponse httpResponse = httpclient.execute(httpPost);
			
			// 9. receive response as inputStream
			inputStream = httpResponse.getEntity().getContent();
			
		    
			// 10. convert inputstream to string
			if(inputStream != null)
				result = convertInputStreamToString(inputStream);
			else
				result = "Não funcionou!";
		
		} catch (Exception e) {
			Log.d("InputStream", e.getLocalizedMessage());
		}
		
		// 11. return result
		return result;
	}
	
	public  String GET(String url){
		InputStream inputStream = null;
		String result = "";
		try {
			
			// create HttpClient
			HttpClient httpclient = new DefaultHttpClient();
			
			// make GET request to the given URL
			HttpResponse httpResponse = httpclient.execute(new HttpGet(url));
			
			// receive response as inputStream
			inputStream = httpResponse.getEntity().getContent();
			
			// convert inputstream to string
			if(inputStream != null)
				result = convertInputStreamToString(inputStream);
			else
				result = "Não Funcionou!";
		
		} catch (Exception e) {
			Log.d("InputStream", e.getLocalizedMessage());
		}
		
		return result;
	}
	
	private static String convertInputStreamToString(InputStream inputStream) throws IOException{
        BufferedReader bufferedReader = new BufferedReader( new InputStreamReader(inputStream));
        String line = "";
        String result = "";
        while((line = bufferedReader.readLine()) != null)
            result += line;
        
        inputStream.close();
        return result;
        
    }


	 private class HttpAsyncTaskPOST extends AsyncTask<String, Void, String> {
	        @Override
	        protected String doInBackground(String... urls) {
	        	return POST(urls[0]);
	        }
	        // onPostExecute displays the results of the AsyncTask.
	        @Override
	        protected void onPostExecute(String result) {
	        	//Toast.makeText(, "Data Sent!", Toast.LENGTH_LONG).show();
	     //   	Toast.makeText(null, "Dados Enviados!", Toast.LENGTH_LONG).show();
	       }
	    }
	    
	    private class HttpAsyncTaskGet extends AsyncTask<String, Void, String> {
	        @Override
	        protected String doInBackground(String... urls) {
	            return GET(urls[0]);
	        }
	        // onPostExecute displays the results of the AsyncTask.
	        @Override
	        protected void onPostExecute(String result) {
	       // 	Toast.makeText(this, "Received!", Toast.LENGTH_LONG).show();
	        //	Toast.setGravity(Gravity.CENTER_HORIZONTAL | Gravity.CENTER_VERTICAL, 0, 0);
	             
	       }
	    }
	    
	    private static String getCurrentTimeStamp() {
	        SimpleDateFormat sdfDate = new SimpleDateFormat("yyyy-mm-dd HH:MM:ss");//dd/MM/yyyy
	        Date now = new Date();
	        String strDate = sdfDate.format(now);
	        return strDate;
	    }
}


