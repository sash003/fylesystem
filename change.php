<?php

$work = new Worker();
//$work->renameImgs();
//$work->resizeUploadImg('img/dest', 'img/dest', 0, 111);
//$work->setPHP('n/src');
//$work->minimize('n/src');

class Worker {
  
  function __construct() {
    mb_internal_encoding('utf-8');
  }
  
  // минимизация файлов, уборка всех лишних пробелов и переносов строк, 
  /*
  function minimize($folder){
    
    $files = glob("$folder/*");
    
    foreach($files as $file){
      $content = file_get_contents($file);
      $minContent = preg_replace("/\/\/.*\n/", "", $content);
      $minContent = str_ireplace(
            array("\r","\n", "\t"),
            array("", "", ""),
            $minContent);
      $minContent = preg_replace("/ +/", " ", $minContent);
      $minContent = preg_replace("/> +</", "><", $minContent);
      $explodeName = explode("/", $file);
      $name = array_pop($explodeName);
      file_put_contents("n/dist/$name", $minContent);
    }

  }
  */
  
  // переименование всех файлов в указанной директории на php-файлы
  function setPHP($path){
    $files = glob($path . '/*');
    foreach ($files as $file){
      $name = substr($file, 0, strrpos($file, '.'));
      $newName = $name.'.php';
      rename($file, $newName);    
    }
  }
  
  // переименование всех картинок в директории на цифры (получаются например 1.png, 2.png и т.д.)
  function renameImgs($path='img/src', $dest='img/dest'){
    $files = glob($path . '/*');
    foreach ($files as $key=>$file){
      $key = $key + 1;
      $fullName = substr($file, strrpos($file, '/')+1);
      $ext  =  mb_substr ($fullName, mb_strrpos($fullName, '.'));
      copy($file, $dest . '/' . $key . $ext);   
    }
  }

  // изменение размеров всех картинок в папке
  public function resizeUploadImg($orig, $dest, $width, $height=0, $del=false){
      
    $result=FALSE;
    $files = glob($orig . '/*');
    
    foreach ($files as $key=>$file){
      $fullName = substr($file, strrpos($file, '/')+1);
      $ext  =  mb_substr ($fullName, mb_strrpos($fullName, '.'));

      try {
    		$img = new \Imagick(realpath($file)); 
        $destiny = __DIR__ . '/' . $dest . '/' . $fullName;
        
    		if($img->getImageMimeType()=='image/gif'){
    			
    		foreach ($img as $frame) {
        		$frame->thumbnailImage($width, $height);    		
    		}
           // Обратите внимание, writeImages вместо writeImage
    		$result=$img->writeImages($destiny, true);
    		
    	    }else{
    			$img->thumbnailImage($width, $height);
    			$img->setImageCompression(Imagick::COMPRESSION_JPEG);
    			$img->setImageCompressionQuality(70);
    			$result = $img->writeImage($destiny);
    		}
    	    $img->clear();
          if($del === true){
            unlink($file);
          }
    	} catch(Exception $e){
    		echo 'У нас проблема '. $e->getMessage(). " в файле ".$e->getFile().", строка ".$e->getLine();
    	}
      
    }
  	
  } 
  
}

?>