<?php

namespace App\Tests\Functional;

use App\Entity\Event;
use App\Test\CustomApiTestCase;
use Hautelook\AliceBundle\PhpUnit\ReloadDatabaseTrait;

class EventResourceTest extends CustomApiTestCase
{
    use ReloadDatabaseTrait;

    public function testCreateEvent()
    {
        $client = self::createClient();

        $client->request('POST', '/api/events', [
            'json' => [],
        ]);
        $this->assertResponseStatusCodeSame(401);

        $this->createUserAndLogIn($client, 'ad@ad.com', 'foo');

        $client->request('POST', '/api/events', [
            'json' => [
                "Start" => "string",
                "End" => "string",
                "Title" => "string",
                "Content" => "string",
                "ContentFull" => "string",
                "Gender" => "string",
                "Email" => "string",
                "owner" => [
                    "/api/users/1"
                ]
            ],
        ]);
        $this->assertResponseStatusCodeSame(201);
    }

    public function testUpdateEvent()
    {
        $client = self::createClient();
        $user = $this->createUser('ad@ad.com', 'foo');

        $event = new Event('Test');
        $event->addOwner($user);
        $event->setStart('asdf');
        $event->setEnd('asdf');
        $event->setContent('asdf');
        $event->setContentFull('asdf');
        $event->setEmail('asdf');
        $event->setTitle('asdf');
        $event->setGender('asdf');

        $em = $this->getEntityManager();
        $em->persist($event);
        $em->flush();

        $this->logIn($client, 'ad@ad.com', 'foo');

        $client->request('PUT', '/api/events'.$event->getId(), [
            'json' => ['title' => 'updated']
        ]);
        $this->assertResponseStatusCodeSame(404);
    }
}