package com.notivia.app;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "NotiviaPlugin")
public class NotiviaPlugin extends Plugin {

    /**
     * Güvenli ve gizlilik odaklı Notivia Eklentisi:
     * Dış bildirimleri dinlemez, hassas veri talep etmez.
     */
    @PluginMethod
    public void getUnsummarizedNotifications(PluginCall call) {
        JSObject ret = new JSObject();
        ret.put("notifications", new JSArray());
        ret.put("count", 0);
        call.resolve(ret);
    }

    @PluginMethod
    public void markAsSummarized(PluginCall call) {
        JSObject ret = new JSObject();
        ret.put("updatedCount", 0);
        call.resolve(ret);
    }
}
