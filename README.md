SmartLink
=========

New tool to transform PO files to upload to and download from Smartling.

### Installing dependencies

You need some libraries before using this tool. The following command will install them automatically.

```
npm install
```

### Uploading keys to smartling

The following command will transform a regular PO file into a Smartling-compatible one.

```
node gettext2smartling.js upload <original.po >modified.po
post modified.po -to smartling
```

### Downloading keys from smartling

The following command will transform a Smartling PO file into a regular one.

```
get translated.po -from smartling
node gettext2smartling.js download <translated.po >final.po
```

### Converting Android XML files to Gettext PO files

The following command will convert an Android XML file into a Gettext PO file, so that it can be applied the transformations above.

```
node android2gettext.js <android.xml >gettext.po
```

### Pending work

There is yet to build:
* a script that will convert a PO file back into Android XML format
* a script that will convert both ways between IOS Strings format and Gettext PO format
