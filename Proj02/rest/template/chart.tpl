<div class="chart">
    <svg version="1.2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="graph" aria-labelledby="title" role="img">
        <text x="430" y="15" class="grid-title"><?php echo $title; ?></text>
        <text x="35" y="15">&mu;g/m&sup3;</text>
        <g class="grid x-grid" id="xGrid">
            <line x1="100" x2="100" y1="25" y2="440"></line>
        </g>
        <g class="grid y-grid" id="yGrid">
            <line x1="100" x2="750" y1="440" y2="440"></line>
        </g>
        <g class="labels x-labels">
            <?php
                if($xlabels){
                    $num = count($xlabels);
                    $xdiff = 650/$num;
                    for ($i = 0; $i < $num; $i++){
                        echo '<text x="'. strval(100 + $i * $xdiff) .'" y="460">'. $xlabels[$i] .'</text>';
                    }
                }
            ?>
            <text x="400" y="490" class="label-title">Data pomiaru</text>
        </g>
        <g class="labels y-labels">
            <text x="80" y="440">0</text>
            <?php
                if($ydiff){
                    for ($i = 1; $i <= 10; $i++){
                        echo '<text x="80" y="'. strval(440 - $i * 42) .'">'. strval($i * $ydiff) .'</text>';
                    }
                }
            ?>
            <text x="35" y="209" class="label-title">Wartość</text>
        </g>
        <g class="dataset">
            <?php
                if($points){
                    $num = count($points);
                    $xdiff = 650/$num;
                    $circles = "";
                    $line = '<polyline points="';
                    for ($i = 0; $i < $num; $i++){
                        $circles = $circles .'<circle cx="'. strval(100 + $i * $xdiff) .'" cy="'. strval(440 - 340 * $points[$i]) .'" r="4"></circle>'; 
                        $line = $line .' '. strval(100 + $i * $xdiff) .','. strval(440 - 340 * $points[$i]);
                    }
                    $line = $line .'"/>';
                    echo $line;
                    echo $circles;
                }
            ?>
        </g>
    </svg>
</div>