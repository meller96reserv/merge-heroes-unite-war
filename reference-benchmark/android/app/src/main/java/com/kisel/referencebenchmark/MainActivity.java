package com.kisel.referencebenchmark;

import android.app.Activity;
import android.os.Bundle;
import android.net.Uri;
import android.util.Log;
import android.view.View;
import android.view.WindowManager;
import android.webkit.*;
import androidx.webkit.WebViewAssetLoader;
import java.io.ByteArrayInputStream;
import java.util.Map;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;

/** Thin, standalone private benchmark host. No production module dependency. */
public final class MainActivity extends Activity {
    private WebView web;
    private static final String ORIGIN = "appassets.androidplatform.net";
    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_FULLSCREEN | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_LAYOUT_STABLE);
        WebView.setWebContentsDebuggingEnabled(true);
        web = new WebView(this); setContentView(web);
        WebSettings s=web.getSettings();
        s.setJavaScriptEnabled(true); s.setDomStorageEnabled(true);
        s.setAllowFileAccess(false); s.setAllowContentAccess(false);
        s.setMediaPlaybackRequiresUserGesture(true);
        s.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        s.setSupportZoom(false);
        if(BuildConfig.OFFLINE)s.setBlockNetworkLoads(true);
        WebViewAssetLoader loader=new WebViewAssetLoader.Builder().addPathHandler("/",new WebViewAssetLoader.AssetsPathHandler(this)).build();
        web.setWebViewClient(new WebViewClient() {
            @Override public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest req) { return local(loader,req.getUrl()); }
            @Override public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest req) { return req.isForMainFrame() && !ORIGIN.equals(req.getUrl().getHost()); }
            @Override public void onReceivedError(WebView v,WebResourceRequest r,WebResourceError e) { Log.e("ReferenceBenchmark","resource error="+e.getErrorCode()+" path="+r.getUrl().getPath()); }
            @Override public void onPageFinished(WebView v,String url) { Log.i("ReferenceBenchmark","page finished (not proof of gameplay)"); }
            @Override public boolean onRenderProcessGone(WebView v,RenderProcessGoneDetail detail) { Log.e("ReferenceBenchmark","renderer gone crash="+detail.didCrash()); return false; }
        });
        ServiceWorkerController.getInstance().setServiceWorkerClient(new ServiceWorkerClient() {
            @Override public WebResourceResponse shouldInterceptRequest(WebResourceRequest req) { return local(loader,req.getUrl()); }
        });
        web.setWebChromeClient(new WebChromeClient() {
            @Override public boolean onConsoleMessage(ConsoleMessage msg) { if(msg.messageLevel()==ConsoleMessage.MessageLevel.ERROR)Log.e("ReferenceBenchmark","JS error line="+msg.lineNumber()+" "+msg.message().replaceAll("(?i)(token|password|authorization)\\s*[:=]\\s*[^ ,;]+","$1=REDACTED"));return true; }
        });
        // WebView persists its own guest storage; never imports live portal cookies.
        web.loadUrl("https://"+ORIGIN+"/index.html");
    }
    private WebResourceResponse local(WebViewAssetLoader loader,Uri uri) {
        if(!ORIGIN.equals(uri.getHost()))return BuildConfig.OFFLINE?missing():null;
        WebResourceResponse response=loader.shouldInterceptRequest(uri);
        if(response==null || response.getData()==null)return publicAssetFallback(uri);
        String p=uri.getPath();
        if(p.endsWith(".wasm"))response.setMimeType("application/wasm");
        if(p.endsWith(".js")||p.endsWith(".mjs"))response.setMimeType("text/javascript");
        response.setResponseHeaders(Map.of("Access-Control-Allow-Origin","*","Cache-Control","no-cache"));
        return response;
    }
    /** Only exact missing asset paths, pinned to the public build. No auth or gameplay adapter. */
    private WebResourceResponse publicAssetFallback(Uri uri) {
        if(BuildConfig.OFFLINE)return missing();
        String relative=uri.getPath().replaceFirst("^/", "");
        if(!relative.matches("assets/[A-Za-z0-9_./-]+") || relative.contains(".."))return missing();
        File base=new File(getCacheDir(),"public-assets");File cached=new File(base,relative);
        try {
            if(!cached.getCanonicalPath().startsWith(base.getCanonicalPath()+File.separator))return missing();
            String mime=URLConnection.guessContentTypeFromName(relative);
            if(relative.endsWith(".webp"))mime="image/webp";
            if(relative.endsWith(".wasm"))mime="application/wasm";
            if(relative.endsWith(".js"))mime="text/javascript";
            if(mime==null)mime="application/octet-stream";
            if(!cached.isFile()) {
                HttpURLConnection conn=(HttpURLConnection)new URL("https://files.crazygames.com/heroes-unite/51/"+relative).openConnection();
                conn.setConnectTimeout(10000);conn.setReadTimeout(15000);conn.setInstanceFollowRedirects(false);
                conn.setRequestProperty("Accept-Encoding","identity");
                if(conn.getResponseCode()!=200){conn.disconnect();return missing();}
                cached.getParentFile().mkdirs();File temp=File.createTempFile("asset-",".part",cached.getParentFile());
                try(InputStream in=conn.getInputStream();OutputStream out=new FileOutputStream(temp)) {
                    byte[] buffer=new byte[16384];int n;long total=0;
                    while((n=in.read(buffer))!=-1){total+=n;if(total>32L*1024*1024)throw new IOException("Asset size limit");out.write(buffer,0,n);}
                } finally {conn.disconnect();}
                if(!temp.renameTo(cached)){temp.delete();if(!cached.isFile())return missing();}
                Log.i("ReferenceBenchmark","cached public asset "+relative);
            }
            return new WebResourceResponse(mime,null,200,"OK",Map.of("Access-Control-Allow-Origin","*","Cache-Control","no-cache"),new FileInputStream(cached));
        } catch(Exception e) {Log.e("ReferenceBenchmark","public asset unavailable "+relative);return missing();}
    }
    private WebResourceResponse missing(){return new WebResourceResponse("text/plain","UTF-8",404,"Not Found",Map.of(),new ByteArrayInputStream(new byte[0]));}
    @Override protected void onPause(){super.onPause();web.onPause();web.pauseTimers();}
    @Override protected void onResume(){super.onResume();if(web!=null){web.onResume();web.resumeTimers();}}
    @Override protected void onDestroy(){if(web!=null){web.stopLoading();web.destroy();web=null;}super.onDestroy();}
    @Override public void onBackPressed(){if(web.canGoBack())web.goBack();else super.onBackPressed();}
}
