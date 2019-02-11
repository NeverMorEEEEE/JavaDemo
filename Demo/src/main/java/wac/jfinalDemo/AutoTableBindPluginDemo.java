package wac.jfinalDemo;

import java.util.List;

import javax.sql.DataSource;

import com.alibaba.druid.pool.DruidDataSource;
import com.jfinal.kit.StrKit;
import com.jfinal.plugin.activerecord.Config;
import com.jfinal.plugin.activerecord.ExtActiveRecordPlugin;
import com.jfinal.plugin.activerecord.Model;
import com.tzsw.core.jfinal.annotation.TableBind;
import com.tzsw.core.jfinal.plugin.ClassSearcher;
import com.tzsw.core.jfinal.plugin.TableNameStyle;

public class AutoTableBindPluginDemo extends ExtActiveRecordPlugin {


    public AutoTableBindPluginDemo(DataSource dataSource) {
        super(dataSource);
        // TODO Auto-generated constructor stub
    }

    String apps_path = "";

    private String tableName(Class<?> clazz) {
        String tableName = clazz.getSimpleName();

        tableName = tableName.toLowerCase();

        return tableName;
    }

    public boolean start() {

        List<Class> modelClasses = null;
        try {
            if ((apps_path == null) || (apps_path.isEmpty())) {
                modelClasses = ClassSearcher.findClasses(Model.class);
            } else {
                String[] paths = apps_path.split(",");
                for (int i = 0; i < paths.length; i++) {
                    if (modelClasses == null) {
                        modelClasses = ClassSearcher.findClasses(Model.class, "/com/tzsw/apps/" + paths[i]);
                    } else {
                        modelClasses.addAll(ClassSearcher.findClasses(Model.class, "/com/tzsw/apps/" + paths[i]));
                    }
                }
            }

            TableBind tb = null;
            for (Class modelClass : modelClasses) {
                tb = (TableBind) modelClass.getAnnotation(TableBind.class);
                if (tb == null) {
                    addMapping(tableName(modelClass), modelClass);
                } else if (StrKit.notBlank(tb.tableName())) {
                    String tableName = tb.tableName();

                    tableName = tableName.toLowerCase();

                    if (StrKit.notBlank(tb.pkName())) {
                        addMapping(tableName, tb.pkName(), modelClass);
                    } else {
                        addMapping(tableName, modelClass);
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return super.start();
    }

    public static void main(String[] args) {
        DataSource dataSource = new DruidDataSource();

        new AutoTableBindPluginDemo(dataSource).start();
    }

}
