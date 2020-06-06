<?php

defined('_JEXEC') or die();

require_once JPATH_THEMES . '/' . $this->template . '/logic.php';

?>

<!doctype html>
<html lang="<?php echo $this->language; ?>">

<head>
    <jdoc:include type="head" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>
	Offline Mode
    <jdoc:include type="modules" name="debug" />
    <script src="<?php echo JPATH_THEMES . '/' . $this->template; ?>/dist/bundle.js"></script>
</body>

</html>