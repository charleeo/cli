<?php

class Stack{
protected $stack;
protected $limit;

public function __construct($limit =20)

{
 $this->stack = [];
 $this->limit = $limit;   
}

public function push($item)
{
    if(count($this->stack) < $this->limit){
        array_push($this->stack,$item);
    }
    return $this;
}
public function pop()
{
    if(!empty($this->stack)){
        array_pop($this->stack);
    }else{
        echo "You are sealing with an empty stack";
    }
    return $this;
}

public function stacks()
{
    return $this->stack;
}

public function currentItem()
{
    return current($this->stack);
}
 
}
$stackObject = new Stack();

$stackArrays = $stackObject->
push(35)->push(45)->push(85)->push(205)->pop()->stacks();
// $pops = $stackObject->pop()->pop()->stacks();


print_r($stackArrays);
