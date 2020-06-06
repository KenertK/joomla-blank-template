<?php 

defined('_JEXEC') or die();

use Joomla\CMS\Factory;

$doc   = Factory::getDocument();
$tpath = $this->baseurl . '/templates/' . $this->template;

// Removes the meta generator tag
$this->setGenerator(null);

// Removes all the boilerplate JS scripts that come with Joomla templates by default
$this->_scripts = array();
unset($this->_script['text/javascript']);

$doc->addStyleSheet($tpath . '/dist/bundle.min.css');
$doc->addScript($tpath . '/dist/bundle.min.js');
