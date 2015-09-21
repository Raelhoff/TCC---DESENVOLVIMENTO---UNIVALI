package com.hmkcode.android;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

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
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;
import android.app.Activity;
import com.hmkcode.android.vo.Device;
import com.hmkcode.android.vo.REST;

public class TestHTTP extends Activity implements OnClickListener {

	TextView tvIsConnected;
	EditText etDevice,etValor,etUnidade, etData;
	Button btnPost;
	EditText etResponse;

	private REST rest = new REST();
	private Device device;
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_testhttp);
		
		// get reference to the views
		tvIsConnected   = (TextView) findViewById(R.id.tvIsConnected);
		etDevice 		= (EditText) findViewById(R.id.etDevice);
		etValor 		= (EditText) findViewById(R.id.etValor);
		etUnidade 		= (EditText) findViewById(R.id.etUnidade);
		etData			= (EditText) findViewById(R.id.etData);
		etResponse 		= (EditText) findViewById(R.id.etResponse);
		btnPost			= (Button)   findViewById(R.id.btnPost);
		
		// check if you are connected or not
		if(isConnected()){
			tvIsConnected.setBackgroundColor(0xFF00CC00);
			tvIsConnected.setText("You are conncted");
        }
		else{
			tvIsConnected.setText("You are NOT conncted");
		}
		
		// add click listener to Button "POST"
		btnPost.setOnClickListener(this);
		new HttpAsyncTaskGet().execute(rest.URL);
		
	}

	public static String POST(String url, Device device){
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
		    jsonObject.accumulate("Data","data");
		    
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
				result = "Did not work!";
		
		} catch (Exception e) {
			Log.d("InputStream", e.getLocalizedMessage());
		}
		
		// 11. return result
		return result;
	}
	
	 @Override
		public void onClick(View view) {
		
			switch(view.getId()){
				case R.id.btnPost:
					if(!validate())
						Toast.makeText(getBaseContext(), "Enter some data!", Toast.LENGTH_LONG).show();
					// call AsynTask to perform network operation on separate thread
					REST rest = new REST();
		        	
					device = new Device();
		        	device.setDevice(etDevice.getText().toString());
		        	device.setValor(etValor.getText().toString());
		        	device.setUnidade(etUnidade.getText().toString());
		        	rest.PostService(device);
		        	
				break;
			}
			
		}
	
    public boolean isConnected(){
    	ConnectivityManager connMgr = (ConnectivityManager) getSystemService(Activity.CONNECTIVITY_SERVICE);
    	    NetworkInfo networkInfo = connMgr.getActiveNetworkInfo();
    	    if (networkInfo != null && networkInfo.isConnected()) 
    	    	return true;
    	    else
    	    	return false;	
    }
   
    private class HttpAsyncTaskGet extends AsyncTask<String, Void, String> {
        @Override
        protected String doInBackground(String... urls) {
              
            return GET(urls[0]);
        }
        // onPostExecute displays the results of the AsyncTask.
        @Override
        protected void onPostExecute(String result) {
        	Toast.makeText(getBaseContext(), "Received!", Toast.LENGTH_LONG).show();
        	etResponse.setText(result);
       }
    }

    


	
	
	private boolean validate(){
		if(etDevice.getText().toString().trim().equals(""))
			return false;
		else if(etValor.getText().toString().trim().equals(""))
			return false;
		else if(etUnidade.getText().toString().trim().equals(""))
			return false;
		else if(etData.getText().toString().trim().equals(""))
			return false;
		else
			return true;	
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
    ////////////////////////////////////////////////////////////////////////////////

	public static String GET(String url){
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
				result = "Did not work!";
		
		} catch (Exception e) {
			Log.d("InputStream", e.getLocalizedMessage());
		}
		
		return result;
	}
	

	


}
