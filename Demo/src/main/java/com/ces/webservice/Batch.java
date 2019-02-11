/**
 * Batch.java
 * <p>
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.ces.webservice;

public class Batch implements java.io.Serializable {
    private java.lang.String pch;

    private java.lang.String sendnumber;

    private java.lang.String sendpath;

    private java.lang.String sendtime;

    private java.lang.String syetemtype;

    public Batch() {
    }

    public Batch(
            java.lang.String pch,
            java.lang.String sendnumber,
            java.lang.String sendpath,
            java.lang.String sendtime,
            java.lang.String syetemtype) {
        this.pch = pch;
        this.sendnumber = sendnumber;
        this.sendpath = sendpath;
        this.sendtime = sendtime;
        this.syetemtype = syetemtype;
    }


    /**
     * Gets the pch value for this Batch.
     *
     * @return pch
     */
    public java.lang.String getPch() {
        return pch;
    }


    /**
     * Sets the pch value for this Batch.
     *
     * @param pch
     */
    public void setPch(java.lang.String pch) {
        this.pch = pch;
    }


    /**
     * Gets the sendnumber value for this Batch.
     *
     * @return sendnumber
     */
    public java.lang.String getSendnumber() {
        return sendnumber;
    }


    /**
     * Sets the sendnumber value for this Batch.
     *
     * @param sendnumber
     */
    public void setSendnumber(java.lang.String sendnumber) {
        this.sendnumber = sendnumber;
    }


    /**
     * Gets the sendpath value for this Batch.
     *
     * @return sendpath
     */
    public java.lang.String getSendpath() {
        return sendpath;
    }


    /**
     * Sets the sendpath value for this Batch.
     *
     * @param sendpath
     */
    public void setSendpath(java.lang.String sendpath) {
        this.sendpath = sendpath;
    }


    /**
     * Gets the sendtime value for this Batch.
     *
     * @return sendtime
     */
    public java.lang.String getSendtime() {
        return sendtime;
    }


    /**
     * Sets the sendtime value for this Batch.
     *
     * @param sendtime
     */
    public void setSendtime(java.lang.String sendtime) {
        this.sendtime = sendtime;
    }


    /**
     * Gets the syetemtype value for this Batch.
     *
     * @return syetemtype
     */
    public java.lang.String getSyetemtype() {
        return syetemtype;
    }


    /**
     * Sets the syetemtype value for this Batch.
     *
     * @param syetemtype
     */
    public void setSyetemtype(java.lang.String syetemtype) {
        this.syetemtype = syetemtype;
    }

    private java.lang.Object __equalsCalc = null;

    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof Batch)) return false;
        Batch other = (Batch) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true &&
                ((this.pch == null && other.getPch() == null) ||
                        (this.pch != null &&
                                this.pch.equals(other.getPch()))) &&
                ((this.sendnumber == null && other.getSendnumber() == null) ||
                        (this.sendnumber != null &&
                                this.sendnumber.equals(other.getSendnumber()))) &&
                ((this.sendpath == null && other.getSendpath() == null) ||
                        (this.sendpath != null &&
                                this.sendpath.equals(other.getSendpath()))) &&
                ((this.sendtime == null && other.getSendtime() == null) ||
                        (this.sendtime != null &&
                                this.sendtime.equals(other.getSendtime()))) &&
                ((this.syetemtype == null && other.getSyetemtype() == null) ||
                        (this.syetemtype != null &&
                                this.syetemtype.equals(other.getSyetemtype())));
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
        if (getPch() != null) {
            _hashCode += getPch().hashCode();
        }
        if (getSendnumber() != null) {
            _hashCode += getSendnumber().hashCode();
        }
        if (getSendpath() != null) {
            _hashCode += getSendpath().hashCode();
        }
        if (getSendtime() != null) {
            _hashCode += getSendtime().hashCode();
        }
        if (getSyetemtype() != null) {
            _hashCode += getSyetemtype().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
            new org.apache.axis.description.TypeDesc(Batch.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://webservice.ces.com/", "batch"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("pch");
        elemField.setXmlName(new javax.xml.namespace.QName("", "pch"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("sendnumber");
        elemField.setXmlName(new javax.xml.namespace.QName("", "sendnumber"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("sendpath");
        elemField.setXmlName(new javax.xml.namespace.QName("", "sendpath"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("sendtime");
        elemField.setXmlName(new javax.xml.namespace.QName("", "sendtime"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("syetemtype");
        elemField.setXmlName(new javax.xml.namespace.QName("", "syetemtype"));
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
