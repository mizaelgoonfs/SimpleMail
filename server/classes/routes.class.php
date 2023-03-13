<?php

class Routes
{
    private $routesList = [''];
    private $callbackList = [''];

    public function add($httpMethod, $route, $callback)
    {
        $this->routesList[] = strtoupper($httpMethod).':'.$route;
        $this->callbackList[] = $callback;

        return $this;
    }

    public function go($route)
    {
        $param = '';
        $callback = '';
        $httpMethod = $_SERVER['REQUEST_METHOD'];
        $route = $httpMethod.":/".$route;
        // var_dump("Rotas:".$route);
        
        if (substr_count($route, "/") == 3) {
            $param = substr($route, strrpos($route, "/")+1);
            $route = substr($route, 0, strrpos($route, "/"))."/[PARAM]";
        }
        
        // echo "Listas: \n";
        // var_dump($this);

        // echo "Rota: \n";
        // var_dump($route);
        
        $index = array_search($route, $this->routesList);
        // echo "Index: \n";
        // var_dump($index);

        if ($index > 0) {
            $callback = explode("::", $this->callbackList[$index]);
        }

        // echo "Callback: \n";
        // var_dump($callback);

        $class = isset($callback[0]) ? $callback[0] : '';
        $method = isset($callback[1]) ? $callback[1] : '';

        if (class_exists($class))
        {
            // echo "Classe existe! \n";
            if (method_exists($class, $method))
            {
                // echo "Método existe! \n";
                // Instanciando a classe Messages
                $instanceClass = new $class(); 
                
                // Chama o método específico da respectiva Classe  
                return call_user_func_array(
                    array($instanceClass, $method),
                    array($param)
                );
            } else {
                $this->notFound();
            }
        } else {
            $this->notFound();
        }
    }

    public function notFound()
    {
        echo json_encode(["data" => "Rota não encontrada!"]);
    }
}

?>