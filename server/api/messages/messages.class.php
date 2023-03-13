<?php

class Messages
{

    public function listAll()
    {
        $db = DB::connect();
        $rs = $db->prepare("SELECT * FROM messages ORDER BY id");
        $rs->execute();
        $obj = $rs->fetchAll(PDO::FETCH_ASSOC);

        if ($obj) {
            echo json_encode(["data" => $obj]);
        } else{
            echo json_encode(["error" => 'Mensagens não encontradas.']);
        }
    }

    public function listReceivedMessages($param)
    {
        $db = DB::connect();
        $rs = $db->prepare("SELECT * FROM messages WHERE receiver='{$param}'");
        $rs->execute();
        $obj = $rs->fetchAll(PDO::FETCH_ASSOC);
    
        if ($obj) {
            echo json_encode(["data" => $obj]);
        } else{
            echo json_encode(["error" => "Mensagens não encontradas."]);
        }
    }

    public function listSentMessages($param)
    {
        $db = DB::connect();
        $rs = $db->prepare("SELECT * FROM messages WHERE sender='{$param}'");
        $rs->execute();
        $obj = $rs->fetchAll(PDO::FETCH_ASSOC);
    
        if ($obj) {
            echo json_encode(["data" => $obj]);
        } else{
            echo json_encode(["error" => "Mensagens não encontradas."]);
        }
    }

    public function listUnique($param)
    {
        $db = DB::connect();
        $rs = $db->prepare("SELECT * FROM messages WHERE id={$param}");
        $rs->execute();
        $obj = $rs->fetchObject();
    
        if ($obj) {
            echo json_encode(["data" => $obj]);
        } else{
            echo json_encode(["error" => "Mensagem não encontrada."]);
        }
    }

    public function send()
    {
        $requestData = JsonUtil::handleJsonRequestBody();

        $sql = "INSERT INTO messages (";
        
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
            echo json_encode(["data" => "Mensagem inserida com sucesso!"]);
        } else{
            echo json_encode(["error" => "Erro ao inserir a mensagem."]);
        }
    }

    public function update($param)
    {
        if($param != '') {
            $requestData = JsonUtil::handleJsonRequestBody();

            $sql = "UPDATE messages SET";
            
            $temp_keys = '';
            foreach(array_keys($requestData) as $index) {
                $temp_keys .= " {$index} = '{$requestData[$index]}',";
            }
            
            $sql .= substr($temp_keys, 0, -1); //remove a última vírgula
            $sql .= " WHERE id = {$param}";
            
            $db = DB::connect();
            $rs = $db->prepare($sql);
            $exec = $rs->execute();
            $rows = $rs->rowCount();
            
            if ($rows > 0) {
                echo json_encode(["data" => "Mensagem atualizada com sucesso!"]);
            } else{
                echo json_encode(["error" => "Erro ao atualizar a mensagem."]);
            }
        } else {
            echo json_encode(["error" => 'É necessário informar o id da mensagem.']);
        }
    }

    public function delete($param)
    {
        if($param != '') {
            $db = DB::connect();
            $rs = $db->prepare("DELETE FROM messages WHERE id={$param}");
            $exec = $rs->execute();
            $rows = $rs->rowCount();
            
            if ($rows > 0) {
                echo json_encode(["data" => "Mensagem excluída com sucesso!"]);
            } else{
                echo json_encode(["error" => "Erro ao excluir a mensagem."]);
            }
        } else {
            echo json_encode(["error" => 'É necessário informar o id da mensagem.']);
        }
    }
}

?>