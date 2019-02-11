package wac.utils.JWT;

import java.io.FileInputStream;
import java.io.InputStream;
import java.security.Key;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.cert.CertificateFactory;
import java.security.interfaces.RSAPrivateCrtKey;
import java.security.spec.RSAPublicKeySpec;
import java.util.Enumeration;
import java.security.cert.Certificate;

import org.apache.shiro.codec.Base64;

public class JKSUtil {

    private String keyStoreFile;
    private char[] password;
    private KeyStore store;
    private Object lock = new Object();

    private static JKSUtil instance = null;

    public static JKSUtil getInstance() {
        synchronized (JKSUtil.class) {
            if (instance == null) {
                synchronized (JKSUtil.class) {
                    instance = new JKSUtil("d:\\keystore\\myuKeyStore.jks",
                            "123456".toCharArray());
                }
            }
            return instance;
        }
    }

    private JKSUtil(String _jksFilePath, char[] password) {
        this.keyStoreFile = _jksFilePath;
        this.password = password;
    }

    public KeyPair getKeyPair(String alias) {
        return getKeyPair(alias, this.password);
    }

    public KeyPair getKeyPair(String alias, char[] password) {
        try {
            synchronized (this.lock) {
                if (this.store == null) {
                    synchronized (this.lock) {
                        InputStream is = this.getClass().getResourceAsStream(
                                keyStoreFile);
                        try {
                            this.store = KeyStore.getInstance("JKS");
                            this.store.load(is, this.password);
                        } finally {
                            if (is != null) {
                                try {
                                    is.close();
                                } catch (Exception e) {
                                }
                            }
                        }
                    }
                }
            }
            RSAPrivateCrtKey key = (RSAPrivateCrtKey) this.store.getKey(alias,
                    password);
            System.out.println(key);
            RSAPublicKeySpec spec = new RSAPublicKeySpec(key.getModulus(),
                    key.getPublicExponent());
            PublicKey publicKey = KeyFactory.getInstance("RSA").generatePublic(
                    spec);
            return new KeyPair(publicKey, key);
        } catch (Exception e) {
            throw new IllegalStateException("Cannot load keys from store: "
                    + this.keyStoreFile, e);
        }
    }

    public static void readJks() throws Exception {
        KeyStore keyStore = KeyStore.getInstance(KeyStore.getDefaultType());
        keyStore.load(new FileInputStream("d:\\keystore\\myuKeyStore.jks"),
                "123456".toCharArray());
        Enumeration<String> aliases = keyStore.aliases();
        String alias = null;
        while (aliases.hasMoreElements()) {
            System.out.println();
            alias = aliases.nextElement();
            System.out.println("jks文件别名是:" + alias);
            PrivateKey key = (PrivateKey) keyStore.getKey(alias,
                    "123456".toCharArray());
            System.out.println("jks文件中的私钥是:"
                    + new String(Base64.encode(key.getEncoded())));
            Certificate certificate = keyStore.getCertificate(alias);
            PublicKey publicKey = certificate.getPublicKey();
            System.out.println("jks文件中的公钥:"
                    + new String(Base64.encode(publicKey.getEncoded())));
        }

    }

    public static KeyStore getKeyStoreByJks() throws Exception {
        KeyStore keyStore = KeyStore.getInstance(KeyStore.getDefaultType());
        keyStore.load(new FileInputStream("d:\\keystore\\myuKeyStore.jks"),
                "123456".toCharArray());
        return keyStore;
    }

    public static Key getPrivateByJks(String alias) throws Exception {
        KeyStore keyStore = KeyStore.getInstance(KeyStore.getDefaultType());
        keyStore.load(new FileInputStream("d:\\keystore\\myuKeyStore.jks"),
                "123456".toCharArray());
        return (PrivateKey) keyStore.getKey(alias,
                "123456".toCharArray());
    }

    public static String getPrivateStrByJks(String alias) throws Exception {
        KeyStore keyStore = KeyStore.getInstance(KeyStore.getDefaultType());
        keyStore.load(new FileInputStream("d:\\keystore\\myuKeyStore.jks"),
                "123456".toCharArray());
        PrivateKey key = (PrivateKey) keyStore.getKey(alias, "123456".toCharArray());
        return new String(Base64.encode(key.getEncoded()));
    }


    // 读取证书文件获取公钥
    public static void readCer() throws Exception {
        CertificateFactory certificateFactory = CertificateFactory
                .getInstance("X.509");
        Certificate certificate = certificateFactory
                .generateCertificate(new FileInputStream(
                        "d:\\keystore\\demo.cer"));
        PublicKey publicKey = certificate.getPublicKey();

        System.out.println();
        System.out.println("Type : " + certificate.getType());
        System.out.println("CER证书中的公钥:"
                + new String(Base64.encode(publicKey.getEncoded())));

    }

    public static void main(String[] args) throws Exception {
        // KeyPair keyPair = JKSUtil.getInstance().getKeyPair("test11");
        // System.out.println(keyPair.getPrivate());
        readJks();

        // readCer();
        // System.out.println(KeyStore.getInstance("wac"));
    }
}
