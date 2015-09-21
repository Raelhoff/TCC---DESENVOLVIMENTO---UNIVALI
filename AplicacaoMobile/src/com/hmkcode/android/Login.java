package com.hmkcode.android;






import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

public class Login extends Activity{
	
	Button btnLogin;
	Button passreset;
	EditText inputUsuario;
	EditText inputSenha ;
	private TextView loginErrorMsg;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		
		setContentView(R.layout.activity_login);
		
	    btnLogin  		= (Button) findViewById(R.id.login);
	    passreset		= (Button) findViewById(R.id.bntreset);
	    inputUsuario	= (EditText) findViewById(R.id.usuario);
	    inputSenha 		= (EditText) findViewById(R.id.pword);

	    
	    passreset.setOnClickListener(new View.OnClickListener() {
	        public void onClick(View view) {
	        	inputUsuario.setText("");
	        	inputSenha.setText("");
	        }});


		
	    btnLogin.setOnClickListener(new OnClickListener() {
			
			@Override
			public void onClick(View v) {

	               if ( ( inputUsuario.getText().toString().equals("")) )
	                {
	                    Toast.makeText(getApplicationContext(),
	                            "Campo usuário esta vazio", Toast.LENGTH_SHORT).show();
	                }
	                else if ( ( inputSenha.getText().toString().equals("")) )
	                {
	                    Toast.makeText(getApplicationContext(),
	                    		"Campo Senha esta vazio", Toast.LENGTH_SHORT).show();
	                }
	                else
	                if (  ( inputUsuario.getText().toString().equals("test")) && ( inputSenha.getText().toString().equals("test")) ){
	    				// TODO Auto-generated method stub
	                	 Toast.makeText(getApplicationContext(),
		                            "Sucesso", Toast.LENGTH_SHORT).show();
	    				  Intent i = new Intent(v.getContext(), Menu.class);
	    				  startActivity(i);	
	                }
	                else{
	                    Toast.makeText(getApplicationContext(),
	                    		"Preencha os campos corretamentes Usuário/Senha", Toast.LENGTH_SHORT).show();
	                }
	     
				}
			});
	  	}
	

	}





		