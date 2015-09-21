package com.hmkcode.android;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.atomic.AtomicBoolean;

import org.achartengine.ChartFactory;
import org.achartengine.GraphicalView;
import org.achartengine.chart.PointStyle;
import org.achartengine.model.XYMultipleSeriesDataset;
import org.achartengine.model.XYSeries;
import org.achartengine.renderer.XYMultipleSeriesRenderer;
import org.achartengine.renderer.XYSeriesRenderer;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;

import com.hmkcode.android.vo.Device;
import com.hmkcode.android.vo.ImageProcessing;
import com.hmkcode.android.vo.REST;
import com.hmkcode.android.TestHTTP;
import com.hmkcode.android.MonitorFrequencia.TYPE;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.res.Configuration;
import android.graphics.Color;
import android.graphics.Paint.Align;
import android.hardware.Camera;
import android.hardware.Camera.PreviewCallback;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.os.PowerManager;
import android.os.PowerManager.WakeLock;
import android.util.Log;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup.LayoutParams;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

public class MonitorFrequencia extends Activity{
	private Timer timer = new Timer();
	private TimerTask task;
	private static int gx;
	private static int j;
	
	private static double flag = 1;
	private Handler handler;
	private String title = "pulse";
	private XYSeries series;
	private XYMultipleSeriesDataset mDataset;
	private GraphicalView chart;
	private XYMultipleSeriesRenderer renderer;
	private Context context;
	private int addX = -1;
	double addY;
	int[] xv = new int[300];
	int[] yv = new int[300];
	int[] hua=new int[]{9,10,11,12,13,14,13,12,11,10,9,8,7,6,7,8,9,10,11,10,10};

	private static final AtomicBoolean processing = new AtomicBoolean(false);
	private static SurfaceView preview = null;
	private static SurfaceHolder previewHolder = null;
	//Android手机相机句柄
	private static Camera camera = null;
	//private static View image = null;
	private static TextView mTV_Heart_Rate = null;
	private static TextView mTV_Avg_Pixel_Values = null;
	private static TextView mTV_pulse = null;
	private static WakeLock wakeLock = null;
	private static int averageIndex = 0;
	private static final int averageArraySize = 4;
	private static final int[] averageArray = new int[averageArraySize];
	private static              int beatsAvg = 0;
	
	private REST rest                 = new REST();
	private Device device             = new Device();
	private static Boolean update     = false;    

	public static enum TYPE {
		GREEN, RED
	};
	
	private static TYPE currentType = TYPE.GREEN;
	public static TYPE getCurrent() {
		return currentType;
	}
	private static int beatsIndex = 0;
	private static final int beatsArraySize = 3;
	private static final int[] beatsArray = new int[beatsArraySize];
	private static double beats = 0;
	private static long startTime = 0;
		

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_monitor);
		initConfig();
	}
	
	@SuppressWarnings("deprecation")
	private void initConfig() {

		context = getApplicationContext();

		LinearLayout layout = (LinearLayout)findViewById(R.id.id_linearLayout_graph);

		series = new XYSeries(title);

		mDataset = new XYMultipleSeriesDataset();

		mDataset.addSeries(series);

		int color = Color.GREEN;
		PointStyle style = PointStyle.CIRCLE;
		renderer = buildRenderer(color, style, true);

		setChartSettings(renderer, "X", "Y", 0, 300, 4, 16, Color.WHITE, Color.WHITE);

		chart = ChartFactory.getLineChartView(context, mDataset, renderer);

		layout.addView(chart, new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT));

		handler = new Handler() {
			@Override
			public void handleMessage(Message msg) {
				updateChart();
				super.handleMessage(msg);
			}
		};

		task = new TimerTask() {
			@Override
			public void run() {
				Message message = new Message();
				message.what = 1;
				handler.sendMessage(message);
			}
		};

		timer.schedule(task, 1,20);           //曲线
		preview = (SurfaceView) findViewById(R.id.id_preview);
		previewHolder = preview.getHolder();
		previewHolder.addCallback(surfaceCallback);
		previewHolder.setType(SurfaceHolder.SURFACE_TYPE_PUSH_BUFFERS);
		
		mTV_Heart_Rate = (TextView) findViewById(R.id.id_tv_heart_rate);
		mTV_Avg_Pixel_Values = (TextView) findViewById(R.id.id_tv_Avg_Pixel_Values);
		mTV_pulse = (TextView) findViewById(R.id.id_tv_pulse);
		
		PowerManager pm = (PowerManager) getSystemService(Context.POWER_SERVICE);
		wakeLock = pm.newWakeLock(PowerManager.FULL_WAKE_LOCK, "DoNotDimScreen");
	}

	@Override
	public void onDestroy() {
		timer.cancel();
		super.onDestroy();
	};
	
	protected XYMultipleSeriesRenderer buildRenderer(int color, PointStyle style, boolean fill) {
		XYMultipleSeriesRenderer renderer = new XYMultipleSeriesRenderer();

		XYSeriesRenderer r = new XYSeriesRenderer();
		r.setColor(Color.RED);
		r.setLineWidth(1);
		renderer.addSeriesRenderer(r);
		return renderer;
	}

	/**
	 * @param renderer
	 * @param xTitle：x标题
	 * @param yTitle：y标题
	 * @param xMin：x最小长度
	 * @param xMax：x最大长度
	 * @param yMin:y最小长度
	 * @param yMax：y最大长度
	 * @param axesColor：颜色
	 * @param labelsColor：标签
	 */
	protected void setChartSettings(XYMultipleSeriesRenderer renderer, String xTitle, String yTitle,
			double xMin, double xMax, double yMin, double yMax, int axesColor, int labelsColor) {
		renderer.setChartTitle(title);
		renderer.setXTitle(xTitle);
		renderer.setYTitle(yTitle);
		renderer.setXAxisMin(xMin);
		renderer.setXAxisMax(xMax);
		renderer.setYAxisMin(yMin);
		renderer.setYAxisMax(yMax);
		renderer.setAxesColor(axesColor);
		renderer.setLabelsColor(labelsColor);
		renderer.setShowGrid(true);
		renderer.setGridColor(Color.GREEN);
		renderer.setXLabels(20);
		renderer.setYLabels(10);
		renderer.setXTitle("Time");
		renderer.setYTitle("mmHg");
		renderer.setYLabelsAlign(Align.RIGHT);
		renderer.setPointSize((float) 3 );
		renderer.setShowLegend(false);
	}

	/**
	 * 更新图标信息
	 */
	private void updateChart() {
		if(flag == 1) {
			addY = 10;
		}
		else {
			flag = 1;
			if(gx < 200){
				if(hua[20] > 1){
					//Toast.makeText(MonitorFrequencia.this, "Identificando altera玢o!", Toast.LENGTH_SHORT).show();
					hua[20] = 0;
					if(update == true){
						device.setDevice("AndroidFrequenciaCardiaca");
						device.setValor(String.valueOf(beatsAvg));
						device.setUnidade("BPS");
						rest.PostService(device);
						update = false;
					}
				}
				hua[20]++;
				return;
			}
			else {
				hua[20] = 10;
			}
			j = 0;
		}
		if(j < 20){
			addY=hua[j];
			j++;
		}
			
		mDataset.removeSeries(series);

		int length = series.getItemCount();
		int bz = 0;
		//addX = length;
		if (length > 300) {
			length = 300;
			bz=1;
		}
		addX = length;
		for (int i = 0; i < length; i++) {
			xv[i] = (int) series.getX(i) - bz;
			yv[i] = (int) series.getY(i);
		}

		series.clear();
		mDataset.addSeries(series);
		series.add(addX, addY);
		for (int k = 0; k < length; k++) {
			series.add(xv[k], yv[k]);
		}
		chart.invalidate();
	} //曲线


	@Override
	public void onConfigurationChanged(Configuration newConfig) {
		super.onConfigurationChanged(newConfig);
	}

	@Override
	public void onResume() {
		super.onResume();
		wakeLock.acquire();
		camera = Camera.open();
		startTime = System.currentTimeMillis();
	}

	@Override
	public void onPause() {
		super.onPause();
		wakeLock.release();
		camera.setPreviewCallback(null);
		camera.stopPreview();
		camera.release();
		camera = null;
	}
	
	private static PreviewCallback previewCallback = new PreviewCallback() {
		public void onPreviewFrame(byte[] data, Camera cam) {
			if (data == null) {
				throw new NullPointerException();
			}
			Camera.Size size = cam.getParameters().getPreviewSize();
			if (size == null) {
				throw new NullPointerException();
			}
			if (!processing.compareAndSet(false, true)) {
				return;
			}
			int width = size.width;
			int height = size.height;
			
			int imgAvg = ImageProcessing.decodeYUV420SPtoRedAvg(data.clone(),height,width);
			gx = imgAvg;
			//mTV_Avg_Pixel_Values.setText("平均像素值是" + String.valueOf(imgAvg));
			
			if (imgAvg == 0 || imgAvg == 255) {
				processing.set(false);
				return;
			}

			int averageArrayAvg = 0;
			int averageArrayCnt = 0;
			for (int i = 0; i < averageArray.length; i++) {
				if (averageArray[i] > 0) {
					averageArrayAvg += averageArray[i];
					averageArrayCnt++;
				}
			}
			
			int rollingAverage = (averageArrayCnt > 0)?(averageArrayAvg/averageArrayCnt):0;
			TYPE newType = currentType;
			if (imgAvg < rollingAverage) {
				newType = TYPE.RED;
				if (newType != currentType) {
					beats++;
					flag=0;
				//	mTV_pulse.setText("脉冲数是" + String.valueOf(beats));
				}
			} else if (imgAvg > rollingAverage) {
				newType = TYPE.GREEN;
			}

			if(averageIndex == averageArraySize) {
				averageIndex = 0;
			}
			averageArray[averageIndex] = imgAvg;
			averageIndex++;

			if (newType != currentType) {
				currentType = newType;
			}
			
			long endTime = System.currentTimeMillis();
			double totalTimeInSecs = (endTime - startTime) / 1000d;
			if (totalTimeInSecs >= 2) {
				double bps = (beats / totalTimeInSecs);
				int dpm = (int) (bps * 60d);
				if (dpm < 30 || dpm > 180|| imgAvg < 200) {
					startTime = System.currentTimeMillis();
					beats = 0;
					processing.set(false);
					return;
				}
				
				if(beatsIndex == beatsArraySize) {
					beatsIndex = 0;
				}
				beatsArray[beatsIndex] = dpm;
				beatsIndex++;
				
				int beatsArrayAvg = 0;
				int beatsArrayCnt = 0;
				for (int i = 0; i < beatsArray.length; i++) {
					if (beatsArray[i] > 0) {
						beatsArrayAvg += beatsArray[i];
						beatsArrayCnt++;
					}
				}
				beatsAvg = (beatsArrayAvg / beatsArrayCnt);
				mTV_Heart_Rate.setText("Batimentos: "+String.valueOf(beatsAvg)); 
						//"  值:" + String.valueOf(beatsArray.length) + 
						//	"    " + String.valueOf(beatsIndex) + 
						//"    " + String.valueOf(beatsArrayAvg) + 
						//"    " + String.valueOf(beatsArrayCnt));
				startTime = System.currentTimeMillis();
				beats  = 0;
				update = true;
			}
			processing.set(false);
		}
	};
	
	private static SurfaceHolder.Callback surfaceCallback = new SurfaceHolder.Callback() {
		@Override
		public void surfaceCreated(SurfaceHolder holder) {
			try {
				camera.setPreviewDisplay(previewHolder);
				camera.setPreviewCallback(previewCallback);
			} catch (Throwable t) {
				Log.e("PreviewDemo-surfaceCallback","Exception in setPreviewDisplay()", t);
			}
		}
		
		@Override
		public void surfaceChanged(SurfaceHolder holder, int format, int width,int height) {
			Camera.Parameters parameters = camera.getParameters();
			parameters.setFlashMode(Camera.Parameters.FLASH_MODE_TORCH);
			Camera.Size size = getSmallestPreviewSize(width, height, parameters);
			if (size != null) {
				parameters.setPreviewSize(size.width, size.height);
			}
			camera.setParameters(parameters);
			camera.startPreview();
		}
		
		@Override
		public void surfaceDestroyed(SurfaceHolder holder) {
			
		}
	};

	private static Camera.Size getSmallestPreviewSize(int width, int height, Camera.Parameters parameters) {
		Camera.Size result = null;
		for (Camera.Size size : parameters.getSupportedPreviewSizes()) {
			if (size.width <= width && size.height <= height) {
				if (result == null) {
					result = size;
				} 
				else {
					int resultArea = result.width * result.height;
					int newArea = size.width * size.height;
					if (newArea < resultArea) {
						result = size;
					}
				}
			}
		}
		return result;
	}
}