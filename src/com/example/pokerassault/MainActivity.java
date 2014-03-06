package com.example.pokerassault;

import android.os.Bundle;
import android.app.Activity;
import android.util.Log;
import android.view.Menu;
import android.webkit.*;

public class MainActivity extends Activity {

	private WebView webView;
	
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        webView = (WebView) findViewById(R.id.webview);
        webView.setClickable(true);
        WebSettings wSettings;
        wSettings = webView.getSettings();
        wSettings.setJavaScriptEnabled(true);
        wSettings.setAllowContentAccess(true);
        wSettings.setDomStorageEnabled(true);
        wSettings.setAllowUniversalAccessFromFileURLs(true);
         
        webView.setWebChromeClient(new WebChromeClient() {
		  public boolean onConsoleMessage(ConsoleMessage cm) {
		    Log.d("MyApplication", cm.message() + "\n -- From line "
		                         + cm.lineNumber() + " of "
		                         + cm.sourceId() );
		    return true;
		  }
		});
        webView.loadUrl("file:///android_asset/index.html");
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }
    
}
