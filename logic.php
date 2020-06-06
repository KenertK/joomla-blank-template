<?php 

defined('_JEXEC') or die();

// use Joomla\CMS\Factory;

// $app = Factory::getApplication();
// $doc = Factory::getDocument();

// Removes the meta generator tag
$this->setGenerator(null);

// Removes all the boilerplate JS scripts that come with Joomla templates by default
$this->_scripts = array();
unset($this->_script['text/javascript']);