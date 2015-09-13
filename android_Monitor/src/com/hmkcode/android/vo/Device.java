package com.hmkcode.android.vo;

public class Device {

	private String device;
	private String valor;
	private String unidade;
	private String time;
	

	public String getDevice() {
		return device;
	}
	public void setDevice(String device) {
		this.device = device;
	}
	public String getValor() {
		return valor;
	}
	public void setValor(String valor) {
		this.valor = valor;
	}
	public String getUnidade() {
		return unidade;
	}
	public void setUnidade(String unidade) {
		this.unidade = unidade;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	
	@Override
	public String toString() {
		return "Device [device=" + device + ", valor=" + valor + ", unidade="
				+ unidade + ", time=" + time + "]";
	}


	
}
