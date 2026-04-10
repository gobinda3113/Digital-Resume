# 🌐 DNS Configuration Guide for Custom Domain

## 📋 Recommended Setup (CNAME Method)

### **Step 1: At Your Domain Registrar** (GoDaddy, Namecheap, etc.)

#### **CNAME Record for www subdomain:**
```
Type: CNAME
Name: www
Value: your-netlify-site-name.netlify.app
TTL: Automatic (or 3600 seconds)
```

#### **A Records for root domain (optional but recommended):**
```
Type: A
Name: @
Value: 75.2.60.5
TTL: Automatic

Type: A  
Name: @
Value: 99.83.190.102
TTL: Automatic
```

### **Step 2: Netlify Configuration**

1. **Go to Netlify dashboard** → Site settings → Domain management
2. **Click "Add custom domain"**
3. **Enter your domain**: `yourdomain.com` (without www)
4. **Netlify will automatically**:
   - Detect your DNS settings
   - Provision SSL certificate
   - Set up HTTPS redirects

### **Step 3: Verify DNS Propagation**

**Check if DNS is working:**
```bash
# Check CNAME record
nslookup www.yourdomain.com

# Check A records  
nslookup yourdomain.com

# Expected results should point to Netlify
```

**DNS propagation typically takes:**
- 1-5 minutes for initial detection
- 1-48 hours for full global propagation

### **Step 4: Final Netlify Settings**

1. **Enable HTTPS**: Automatic with Netlify
2. **Force HTTPS**: Site settings → Domain management → HTTPS → Force HTTPS
3. **Redirects**: Netlify automatically handles www/non-www redirects

## 🔧 Advanced Configuration (Optional)

### **If you want root domain only (no www):**
```
# Only use A records, no CNAME
Type: A
Name: @  
Value: 75.2.60.5

Type: A
Name: @
Value: 99.83.190.102
```

### **If you want www only:**
```
# Only use CNAME, no A records
Type: CNAME
Name: www
Value: your-netlify-site.netlify.app
```

### **Email forwarding (if needed):**
```
# MX records for email (if using domain email)
Type: MX
Name: @
Value: mail.your-email-provider.com
Priority: 10
```

## 🚨 Troubleshooting DNS Issues

### **Common Problems:**
1. **"DNS not configured"** in Netlify:
   - Wait 5-10 minutes after DNS changes
   - Double-check record values

2. **SSL certificate pending**:
   - DNS must fully propagate first
   - Usually resolves within 1 hour

3. **Mixed content warnings**:
   - Ensure all assets use HTTPS
   - Netlify automatically handles this

### **Verification Commands:**
```powershell
# Windows DNS check
Resolve-DnsName yourdomain.com
Resolve-DnsName www.yourdomain.com

# Check specific record types
Resolve-DnsName yourdomain.com -Type A
Resolve-DnsName www.yourdomain.com -Type CNAME
```

## 📊 Monitoring DNS Propagation

### **Global DNS Check Tools:**
1. **dnschecker.org** - Worldwide DNS propagation check
2. **whatsmydns.net** - Real-time DNS lookup
3. **digwebinterface.com** - Advanced DNS queries

### **Expected Timeline:**
- ✅ **Immediate**: Local DNS server update
- ✅ **5-30 minutes**: Major DNS networks
- ✅ **1-4 hours**: Most ISPs worldwide  
- ✅ **24-48 hours**: Full global propagation

## 🔒 Security Considerations

### **DNS Security:**
- **DNSSEC**: Enable if supported by your registrar
- **WHOIS privacy**: Protect your personal information
- **Domain locking**: Prevent unauthorized transfers

### **Netlify Security:**
- **Automatic SSL**: Free HTTPS certificates
- **DDoS protection**: Built-in with Netlify
- **Form protection**: Built-in spam prevention

## 🎯 Final Checklist

- [ ] CNAME record set for www subdomain
- [ ] A records set for root domain (optional)
- [ ] Domain added in Netlify dashboard
- [ ] DNS propagation verified
- [ ] SSL certificate issued
- [ ] HTTPS redirects working
- [ ] Contact form tested on custom domain

## 📞 Support Resources

### **Domain Registrar Support:**
- Check your registrar's DNS documentation
- Contact their support for DNS issues

### **Netlify Support:**
- [Netlify DNS Docs](https://docs.netlify.com/domains-https/custom-domains/)
- [Netlify Community](https://community.netlify.com/)

---

## 🚀 Your Custom Domain is Ready!

Once DNS propagates, your portfolio will be available at:
- `https://yourdomain.com` (root domain)
- `https://www.yourdomain.com` (www subdomain)

All contact form functionality will work seamlessly on your custom domain! 🎉