<?php

namespace App\Tests\Functional;

use App\Entity\User;
use App\Test\CustomApiTestCase;
use Hautelook\AliceBundle\PhpUnit\ReloadDatabaseTrait;

class EventResourceTest extends CustomApiTestCase
{
    use ReloadDatabaseTrait;

    public function testCreateEvent()
    {
        $client = self::createClient();

        $client->request('POST', '/api/events', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [],
        ]);

        $this->assertResponseStatusCodeSame(401);

        $this->createUser('ad@ad.com', '$argon2id$v=19$m=65536,t=4,p=1$caioJjZc+BxolW67iUDEXQ$9CBbLZs2ClTE79cd2CX8NU3MbHePaQvN6f0thd7g9Wo');

        $this->logIn($client, 'ad@ad.com', 'foo');
    }
}