const express = require('express');
const router = express.Router();
const { SiteInformation, SiteData, upload } = require("../../Controller/Settings/GeneralSettings/SiteInformation");

router.put('/settings/generalsettings/siteinformation', upload, SiteInformation);
router.get('/settings/information', upload, SiteData);

module.exports = router;
