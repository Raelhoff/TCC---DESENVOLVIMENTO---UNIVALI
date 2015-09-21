package com.hmkcode.android;

import java.util.ArrayList;
import java.util.List;

import com.hmkcode.android.vo.Adaptador;
import com.hmkcode.android.vo.Device;
import com.hmkcode.android.vo.REST;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup.LayoutParams;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.GridView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.hmkcode.android.R;


public class Historico extends Activity{
	TextView Texto;
	
	private REST rest = new REST();
	@Override
	

	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_historico);
		
		
		Texto = (TextView) findViewById(R.id.textViewHistorico);
		Texto.setText("          Carregando Informações");
		
		new HttpAsyncTaskGet().execute(rest.URL);
	}

	private class HttpAsyncTaskGet extends AsyncTask<String, Void, String> {
        @Override
        protected String doInBackground(String... urls) {
            return rest.GET(urls[0]);
        }
        // onPostExecute displays the results of the AsyncTask.
        @Override
        protected void onPostExecute(String result) {
        	Toast.makeText(getBaseContext(), "Dados recebidos!", Toast.LENGTH_LONG).show();

        	 try {
        		 MostraListra(result);
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
       }
	}       
    
	public void MostraListra(String result) throws JSONException{
		
		JSONArray  my_obj_list = new JSONArray (result);
		ArrayList<String> numbers = new ArrayList<String>();
		
		Texto = (TextView) findViewById(R.id.textViewHistorico);
		Texto.setText("");
		
		numbers.add("Dispositivo");
		numbers.add("Valor");
		numbers.add("Unidade");
		numbers.add("Data");
		
		for(int i =0; i < my_obj_list.length(); i++){
		    numbers.add((String) my_obj_list.getJSONObject(i).get("device"));
		    numbers.add( (String) my_obj_list.getJSONObject(i).get("valor"));
		    numbers.add( (String) my_obj_list.getJSONObject(i).get("unidade"));
		    numbers.add( (String) my_obj_list.getJSONObject(i).get("time"));
		}
		
		GridView gridView = (GridView) findViewById(R.id.gridView1);
		ArrayAdapter<String> adapter = new ArrayAdapter<String>(this,
						android.R.layout.simple_list_item_activated_1, numbers);

		gridView.setAdapter(adapter);

		gridView.setOnItemClickListener(new OnItemClickListener() {
		public void onItemClick(AdapterView<?> parent, View v,
						int position, long id) {
			Toast.makeText(getApplicationContext(),
			((TextView) v).getText(), Toast.LENGTH_SHORT).show();
					}
			});

		}
 
	}


