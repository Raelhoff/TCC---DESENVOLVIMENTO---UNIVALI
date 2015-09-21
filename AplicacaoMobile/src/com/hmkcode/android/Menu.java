package com.hmkcode.android;

import pro.apus.bleconnect.DeviceScanActivity;
import name.bagi.levente.pedometer.Pedometer;
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
				Intent i = new Intent(v.getContext(), Pedometer.class);
				startActivity(i);
			}
		});
		
		
		btn = (Button)findViewById(R.id.btn2);
		
		btn.setOnClickListener(new OnClickListener() {
			
			@Override
			public void onClick(View v) {
				// TODO Auto-generated method stub
				Intent i = new Intent(v.getContext(), MonitorFrequencia.class);
				startActivity(i);
			}
		});
		
		btn = (Button)findViewById(R.id.btn3);
		
		btn.setOnClickListener(new OnClickListener() {
			
			@Override
			public void onClick(View v) {
				// TODO Auto-generated method stub
				Intent i = new Intent(v.getContext(), DeviceScanActivity.class);
				startActivity(i);
			}
		});
		
		
		btn = (Button)findViewById(R.id.btn4);
		
		btn.setOnClickListener(new OnClickListener() {
			
			@Override
			public void onClick(View v) {
				// TODO Auto-generated method stub
				Intent i = new Intent(v.getContext(), Historico.class);
				startActivity(i);
			}
		});
		

		btn = (Button)findViewById(R.id.btn5);
		
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
