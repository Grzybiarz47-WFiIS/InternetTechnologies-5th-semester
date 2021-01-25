<?php

require_once('../app/view.php');

class Chart{

    private $v;

    public function __construct(){
        $this->v = new View('chart');
    }

    public function draw($data, $localization){
        $xlabels = $this->findxLabels($data);
        $max = $this->maxVal($data);
        
        $this->v->xlabels = $xlabels;
        $this->v->ydiff = ceil($max/10);
        $this->v->title = $localization;
        $this->v->points = $this->scale($data, $max);
        return strval($this->v);
    }

    private function maxVal($data){
        $limit = 10;
        foreach($data as $row){
            if($row['y'] > $limit)
                $limit = $row['y'];
        }
        return $limit + 10;
    }

    private function findxLabels($data){
        $num = count($data);
        $xdiff = ceil($num/10);
        $res = Array();
        for ($i = 0; $i < $num; $i = $i + $xdiff){
            $res[] = $data[$i]['x'];
        }
        return $res;
    }

    private function scale($data, $max){
        $num = count($data);
        $res = Array();
        for ($i = 0; $i < $num; $i++){
            $res[] = $data[$i]['y']/$max;
        }
        return $res;
    }
}

?>