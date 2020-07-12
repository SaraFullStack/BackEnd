<?php

	function main(){
		echo "Choose an option: \n";
        echo "\t 1. Get URLs from a given URL. \n";
        echo "\t 2. Get URLs of a given URL and the number of nodes indicated. \n";
        echo "\t 3. Exit. \n";
        echo "\n Option:";
		
		$opcion = fread(STDIN, 100);
		$opcion = trim($opcion, "\n");

		switch( $opcion ){
			case 1:
				full( false );
				echo "\n\n\n";
				main();
				break;
			case 2:
				full( true );
				echo "\n\n\n";
				main();
				break;
			case 3:
				echo "Goodbye \n";
				break;
			default:
				echo "WRONG OPTION, TRY AGAIN";
				echo "\n\n\n";
				main();
				break;
		}
	}

	function full( $option = true ){
		echo "Enter URL: ";
		$url = fread(STDIN, 100);
		$url = trim($url, "\n");

		$urls = callCurl( $url );
		
		if( !is_null($urls[0]) && $urls[0] === true ){
			echo "Requests to provided URL returned error. \n";
            		echo "The error is: \n";
			var_dump($urls[1]);
		} else {
			if($option) {
				echo "\nEnter number of nodes: ";
				$numNodes = fread(STDIN, 100);
				$numNodes = trim($numNodes, "\n");
			} else {
				$numNodes = 0;
			}

			for( $i = 0; $i < count($urls); $i++ ){
				echo "--- " . $urls[$i] . "\n";
				
				if($numNodes > 0) {
					arbol($urls[$i], $numNodes, $numNodes);
					echo "\n";
				}
			}
		}
	}

	function callCurl( $url ){
		$ch = curl_init();
		curl_setopt( $ch, CURLOPT_URL, $url );
		curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );

		$response = curl_exec( $ch );
		$err = curl_error( $ch );
		$info = curl_getinfo( $ch );
		curl_close( $ch );

		if( !is_null($err) && $err !== false && isset($err) && $err != "" ){
			return [ true, $err ];
		}
	
		$dom = new DOMDocument;
		@$dom->loadHTML($response);
		$links = array();
		$links[] = $dom->getElementsByTagName('a');
		$links[] = $dom->getElementsByTagName('link');
		$urls = array();

		foreach ($links as $link){
			foreach ($link as $ln){
				if (filter_var($ln->getAttribute('href'), FILTER_VALIDATE_URL)){
					$urls[] = $ln->getAttribute('href');
				}
				if (filter_var($ln->getAttribute('src'), FILTER_VALIDATE_URL)){
					$urls[] = $ln->getAttribute('src');
				}
			}
		}
		return $urls;
	}

	function arbol( $url, $numNodes, $numNodesOriginal ){
		$urls = callCurl( $url );
		$urlsFinal = array();
		$numNodes = $numNodes - 1;

		if( $numNodes > 0 ){
			if( !is_null($urls) ){
				for( $i = 0; $i < count($urls); $i++ ){
					for( $t = 0; $t < ( $numNodesOriginal - $numNodes ); $t++ ){
						echo "\t";
					}
					echo "--- " . $urls[$i] . "\n";
					arbol($urls[$i], $numNodes, $numNodesOriginal);
				}
			}
		} else {
			$urlsFinal = $urls;
			for( $i = 0; $i < count($urls); $i++ ){
				for( $t = 0; $t < ( $numNodesOriginal - $numNodes ); $t++ ){
					echo "\t";
				}
				echo "--- " . $urls[$i] . "\n";
			}
		}
	}

	main();
?>