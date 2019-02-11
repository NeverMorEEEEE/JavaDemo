/**
 * Deptcode.java
 * <p>
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.ces.webservice;

public class Deptcode implements java.io.Serializable {
    private java.lang.String bmbm;

    private java.lang.String bmmc;

    private java.lang.String qzqc;

    public Deptcode() {
    }

    public Deptcode(
            java.lang.String bmbm,
            java.lang.String bmmc,
            java.lang.String qzqc) {
        this.bmbm = bmbm;
        this.bmmc = bmmc;
        this.qzqc = qzqc;
    }


    /**
     * Gets the bmbm value for this Deptcode.
     *
     * @return bmbm
     */
    public java.lang.String getBmbm() {
        return bmbm;
    }


    /**
     * Sets the bmbm value for this Deptcode.
     *
     * @param bmbm
     */
    public void setBmbm(java.lang.String bmbm) {
        this.bmbm = bmbm;
    }


    /**
     * Gets the bmmc value for this Deptcode.
     *
     * @return bmmc
     */
    public java.lang.String getBmmc() {
        return bmmc;
    }


    /**
     * Sets the bmmc value for this Deptcode.
     *
     * @param bmmc
     */
    public void setBmmc(java.lang.String bmmc) {
        this.bmmc = bmmc;
    }


    /**
     * Gets the qzqc value for this Deptcode.
     *
     * @return qzqc
     */
    public java.lang.String getQzqc() {
        return qzqc;
    }


    /**
     * Sets the qzqc value for this Deptcode.
     *
     * @param qzqc
     */
    public void setQzqc(java.lang.String qzqc) {
        this.qzqc = qzqc;
    }

    private java.lang.Object __equalsCalc = null;

    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof Deptcode)) return false;
        Deptcode other = (Deptcode) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true &&
                ((this.bmbm == null && other.getBmbm() == null) ||
                        (this.bmbm != null &&
                                this.bmbm.equals(other.getBmbm()))) &&
                ((this.bmmc == null && other.getBmmc() == null) ||
                        (this.bmmc != null &&
                                this.bmmc.equals(other.getBmmc()))) &&
                ((this.qzqc == null && other.getQzqc() == null) ||
                        (this.qzqc != null &&
                                this.qzqc.equals(other.getQzqc())));
        __equalsCalc = null;
        return _equals;
    }

    private boolean __hashCodeCalc = false;

    public synchronized int hashCode() {
        if (__hashCodeCalc) {
            return 0;
        }
        __hashCodeCalc = true;
        int _hashCode = 1;
        if (getBmbm() != null) {
            _hashCode += getBmbm().hashCode();
        }
        if (getBmmc() != null) {
            _hashCode += getBmmc().hashCode();
        }
        if (getQzqc() != null) {
            _hashCode += getQzqc().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
            new org.apache.axis.description.TypeDesc(Deptcode.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://webservice.ces.com/", "deptcode"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("bmbm");
        elemField.setXmlName(new javax.xml.namespace.QName("", "bmbm"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("bmmc");
        elemField.setXmlName(new javax.xml.namespace.QName("", "bmmc"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("qzqc");
        elemField.setXmlName(new javax.xml.namespace.QName("", "qzqc"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
    }

    /**
     * Return type metadata object
     */
    public static org.apache.axis.description.TypeDesc getTypeDesc() {
        return typeDesc;
    }

    /**
     * Get Custom Serializer
     */
    public static org.apache.axis.encoding.Serializer getSerializer(
            java.lang.String mechType,
            java.lang.Class _javaType,
            javax.xml.namespace.QName _xmlType) {
        return
                new org.apache.axis.encoding.ser.BeanSerializer(
                        _javaType, _xmlType, typeDesc);
    }

    /**
     * Get Custom Deserializer
     */
    public static org.apache.axis.encoding.Deserializer getDeserializer(
            java.lang.String mechType,
            java.lang.Class _javaType,
            javax.xml.namespace.QName _xmlType) {
        return
                new org.apache.axis.encoding.ser.BeanDeserializer(
                        _javaType, _xmlType, typeDesc);
    }

}
