<?php

use InvalidArgumentException as InvalidArgumentExceptionForJson;
use JsonException as JsonExceptionDecode;

class JsonUtil
{
    /**
     * @return array|mixed
     */
    public static function handleJsonRequestBody()
    {
        try {
            $postJson = json_decode(file_get_contents('php://input'), true, 512, JSON_THROW_ON_ERROR);
        } catch (JsonExceptionDecode $e) {
            throw new InvalidArgumentExceptionForJson("JSON vazio: O Corpo da requisição não pode ser vazio!");
        }
        if (is_array($postJson) && count($postJson) > 0) {
            return $postJson;
        }
    }
}

?>