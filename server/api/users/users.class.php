<?php

class Users
{
    public function login()
    {
        $requestData = JsonUtil::handleJsonRequestBody();
        
        $username = $requestData["username"];
        // echo "USERNAME: \n";
        // echo $username;

        $username = addslashes(htmlspecialchars($username)) ?? '';
    
        $db = DB::connect();
        $rs = $db->prepare("SELECT * FROM users WHERE username='{$username}'");
        $rs->execute();
        $obj = $rs->fetchObject();
        $rows = $rs->rowCount();
            
        if ($rows > 0) {
            echo json_encode(["data" => $obj]);
        } else{
            echo json_encode(["error" => "Usuário não cadastrado!"]);
        }
    }

    
    public function register()
    {
        $requestData = JsonUtil::handleJsonRequestBody();

        $sql = "INSERT INTO users (";
        
        $temp_keys = '';
        foreach(array_keys($requestData) as $index) {
            $temp_keys .= "{$index},";
        }
        
        $sql .= substr($temp_keys, 0, -1); //remove a última vírgula
        $sql .= ") VALUES (";
        
        $temp_values = '';
        foreach(array_values($requestData) as $value) {
            $temp_values .= "'{$value}',";
        }
        
        $sql .= substr($temp_values, 0, -1); //remove a última vírgula
        $sql .= ")";
        
        $db = DB::connect();
        $rs = $db->prepare($sql);
        $exec = $rs->execute();
        
        if ($exec) {
            echo json_encode(["data" => "Usuário cadastrado com sucesso!"]);
        } else{
            echo json_encode(["error" => "Erro ao cadastrar usuário."]);
        }
    }
    
    /*
    public function update($username)
    {
        if($username != '') {
            $requestData = JsonUtil::handleJsonRequestBody();

            $sql = "UPDATE users SET";
            
            $temp_keys = '';
            foreach(array_keys($requestData) as $index) {
                $temp_keys .= " {$index} = '{$requestData[$index]}',";
            }
            
            $sql .= substr($temp_keys, 0, -1); //remove a última vírgula
            $sql .= " WHERE username = '{$username}'";
            
            $db = DB::connect();
            $rs = $db->prepare($sql);
            $exec = $rs->execute();
            
            if ($exec) {
                echo json_encode(["data" => "Usuário atualizado com sucesso!"]);
            } else{
                echo json_encode(["error" => "Erro ao atualizar os dados do Usuário."]);
            }
        } else {
            echo json_encode(["error" => 'É necessário informar o id do usuário.']);
        }
    }
    */

    /*
    public function delete($username)
    {
        if($username != '') {
            $db = DB::connect();
            $rs = $db->prepare("DELETE FROM users WHERE username='{$username}'");
            $exec = $rs->execute();
            $rows = $rs->rowCount();
            
            if ($rows > 0) {
                echo json_encode(["data" => "Usuário excluído com sucesso!"]);
            } else{
                echo json_encode(["error" => "Erro ao excluir usuário."]);
            }
        } else {
            echo json_encode(["error" => 'É necessário informar o id do usuário.']);
        }
    }
    */
}

?>