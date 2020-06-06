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
    <p>Online Mode</p>
    <jdoc:include type="modules" name="debug" />
</body>

</html>