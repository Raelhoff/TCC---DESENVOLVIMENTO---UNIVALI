package com.hmkcode.android;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.TextView;

public class Menu extends Activity{
	
	Button btn;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		
		setContentView(R.layout.activity_menu);
		
		btn = (Button)findViewById(R.id.btn1);
		
		btn.setOnClickListener(new OnClickListener() {
			
			@Override
			public void onClick(View v) {
				// TODO Auto-generated method stub
				Intent i = new Intent(v.getContext(), MonitorFrequencia.class);
				startActivity(i);
				
				
			}
		});
		
		
		btn = (Button)findViewById(R.id.btn2);
		
		btn.setOnClickListener(new OnClickListener() {
			
			@Override
			public void onClick(View v) {
				// TODO Auto-generated method stub
				Intent i = new Intent(v.getContext(), TestHTTP.class);
				startActivity(i);
				
				
			}
		});
		
		
		
	}

}
