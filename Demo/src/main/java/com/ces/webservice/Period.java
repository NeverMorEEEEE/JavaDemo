/**
 * Period.java
 * <p>
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.ces.webservice;

public class Period implements java.io.Serializable {
    private java.lang.String bgqx;

    private java.lang.String bmbm;

    private java.lang.String bmmc;

    private java.lang.String gdfw;

    private java.lang.String sxbbh;

    private java.lang.String sxbm;

    private java.lang.String sxmc;

    public Period() {
    }

    public Period(
            java.lang.String bgqx,
            java.lang.String bmbm,
            java.lang.String bmmc,
            java.lang.String gdfw,
            java.lang.String sxbbh,
            java.lang.String sxbm,
            java.lang.String sxmc) {
        this.bgqx = bgqx;
        this.bmbm = bmbm;
        this.bmmc = bmmc;
        this.gdfw = gdfw;
        this.sxbbh = sxbbh;
        this.sxbm = sxbm;
        this.sxmc = sxmc;
    }


    /**
     * Gets the bgqx value for this Period.
     *
     * @return bgqx
     */
    public java.lang.String getBgqx() {
        return bgqx;
    }


    /**
     * Sets the bgqx value for this Period.
     *
     * @param bgqx
     */
    public void setBgqx(java.lang.String bgqx) {
        this.bgqx = bgqx;
    }


    /**
     * Gets the bmbm value for this Period.
     *
     * @return bmbm
     */
    public java.lang.String getBmbm() {
        return bmbm;
    }


    /**
     * Sets the bmbm value for this Period.
     *
     * @param bmbm
     */
    public void setBmbm(java.lang.String bmbm) {
        this.bmbm = bmbm;
    }


    /**
     * Gets the bmmc value for this Period.
     *
     * @return bmmc
     */
    public java.lang.String getBmmc() {
        return bmmc;
    }


    /**
     * Sets the bmmc value for this Period.
     *
     * @param bmmc
     */
    public void setBmmc(java.lang.String bmmc) {
        this.bmmc = bmmc;
    }


    /**
     * Gets the gdfw value for this Period.
     *
     * @return gdfw
     */
    public java.lang.String getGdfw() {
        return gdfw;
    }


    /**
     * Sets the gdfw value for this Period.
     *
     * @param gdfw
     */
    public void setGdfw(java.lang.String gdfw) {
        this.gdfw = gdfw;
    }


    /**
     * Gets the sxbbh value for this Period.
     *
     * @return sxbbh
     */
    public java.lang.String getSxbbh() {
        return sxbbh;
    }


    /**
     * Sets the sxbbh value for this Period.
     *
     * @param sxbbh
     */
    public void setSxbbh(java.lang.String sxbbh) {
        this.sxbbh = sxbbh;
    }


    /**
     * Gets the sxbm value for this Period.
     *
     * @return sxbm
     */
    public java.lang.String getSxbm() {
        return sxbm;
    }


    /**
     * Sets the sxbm value for this Period.
     *
     * @param sxbm
     */
    public void setSxbm(java.lang.String sxbm) {
        this.sxbm = sxbm;
    }


    /**
     * Gets the sxmc value for this Period.
     *
     * @return sxmc
     */
    public java.lang.String getSxmc() {
        return sxmc;
    }


    /**
     * Sets the sxmc value for this Period.
     *
     * @param sxmc
     */
    public void setSxmc(java.lang.String sxmc) {
        this.sxmc = sxmc;
    }

    private java.lang.Object __equalsCalc = null;

    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof Period)) return false;
        Period other = (Period) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true &&
                ((this.bgqx == null && other.getBgqx() == null) ||
                        (this.bgqx != null &&
                                this.bgqx.equals(other.getBgqx()))) &&
                ((this.bmbm == null && other.getBmbm() == null) ||
                        (this.bmbm != null &&
                                this.bmbm.equals(other.getBmbm()))) &&
                ((this.bmmc == null && other.getBmmc() == null) ||
                        (this.bmmc != null &&
                                this.bmmc.equals(other.getBmmc()))) &&
                ((this.gdfw == null && other.getGdfw() == null) ||
                        (this.gdfw != null &&
                                this.gdfw.equals(other.getGdfw()))) &&
                ((this.sxbbh == null && other.getSxbbh() == null) ||
                        (this.sxbbh != null &&
                                this.sxbbh.equals(other.getSxbbh()))) &&
                ((this.sxbm == null && other.getSxbm() == null) ||
                        (this.sxbm != null &&
                                this.sxbm.equals(other.getSxbm()))) &&
                ((this.sxmc == null && other.getSxmc() == null) ||
                        (this.sxmc != null &&
                                this.sxmc.equals(other.getSxmc())));
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
        if (getBgqx() != null) {
            _hashCode += getBgqx().hashCode();
        }
        if (getBmbm() != null) {
            _hashCode += getBmbm().hashCode();
        }
        if (getBmmc() != null) {
            _hashCode += getBmmc().hashCode();
        }
        if (getGdfw() != null) {
            _hashCode += getGdfw().hashCode();
        }
        if (getSxbbh() != null) {
            _hashCode += getSxbbh().hashCode();
        }
        if (getSxbm() != null) {
            _hashCode += getSxbm().hashCode();
        }
        if (getSxmc() != null) {
            _hashCode += getSxmc().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
            new org.apache.axis.description.TypeDesc(Period.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://webservice.ces.com/", "period"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("bgqx");
        elemField.setXmlName(new javax.xml.namespace.QName("", "bgqx"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
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
        elemField.setFieldName("gdfw");
        elemField.setXmlName(new javax.xml.namespace.QName("", "gdfw"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("sxbbh");
        elemField.setXmlName(new javax.xml.namespace.QName("", "sxbbh"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("sxbm");
        elemField.setXmlName(new javax.xml.namespace.QName("", "sxbm"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("sxmc");
        elemField.setXmlName(new javax.xml.namespace.QName("", "sxmc"));
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
