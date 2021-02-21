<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\EventRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *     itemOperations={
 *          "get"={"security" = "is_granted('ROLE_USER')"},
 *          "put"={
 *              "security"="is_granted('ROLE_USER')",
 *              "security_message"="Only the creator can edit a cheese listing"
 *          },
 *          "delete"={"security"="is_granted('ROLE_USER')",}
 *     },
 *     collectionOperations={
 *          "get"={"security" = "is_granted('ROLE_USER')"},
 *          "post" = {"security" = "is_granted('ROLE_USER')"}
 *     },
 *     normalizationContext={"groups"={"events:read"}, "swagger_defintion_name"="Read"},
 *     denormalizationContext={"groups"={"events:write"}, "swagger_defintion_name"="Write"},
 *     shortName="events"
 * )
 * @ORM\Entity(repositoryClass=EventRepository::class)
 */
class Event
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"events:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"events:read", "events:write", "user:read", "user:write"})
     * @Assert\Length(
     *     min=2,
     *     max=50,
     *     maxMessage="Date and Time"
     * )
     */
    private $start;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"events:read", "events:write", "user:read", "user:write"})
     * @Assert\Length(
     *     min=2,
     *     max=50,
     *     maxMessage="Date and Time"
     * )
     */
    private $end;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"events:read", "events:write", "user:read", "user:write"})
     * @Assert\Length(
     *     min=2,
     *     max=50,
     *     maxMessage="LastName, FristName"
     * )
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"events:read", "events:write", "user:read", "user:write"})
     */
    private $content;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"events:read", "events:write", "user:read", "user:write"})
     */
    private $contentFull;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"events:read", "events:write", "user:read", "user:write"})
     */
    private $gender;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"events:read", "events:write", "user:read", "user:write"})
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"events:read", "events:write", "user:read", "user:write"})
     */
    private $phone;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, inversedBy="events")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"events:read", "events:write", "events:collection:post"})
     * @Assert\Valid()
     */
    private $owner;

    public function __construct()
    {
        $this->owner = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStart(): ?string
    {
        return $this->start;
    }

    public function setStart(string $start): self
    {
        $this->start = $start;

        return $this;
    }

    public function getEnd(): ?string
    {
        return $this->end;
    }

    public function setEnd(string $end): self
    {
        $this->end = $end;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(?string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getContentFull(): ?string
    {
        return $this->contentFull;
    }

    public function setContentFull(?string $contentFull): self
    {
        $this->contentFull = $contentFull;

        return $this;
    }

    public function getGender(): ?string
    {
        return $this->gender;
    }

    public function setGender(string $gender): self
    {
        $this->gender = $gender;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(string $phone): self
    {
        $this->phone = $phone;

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getOwner(): Collection
    {
        return $this->owner;
    }

    public function addOwner(User $owner): self
    {
        if (!$this->owner->contains($owner)) {
            $this->owner[] = $owner;
        }

        return $this;
    }

    public function removeOwner(User $owner): self
    {
        if ($this->owner->contains($owner)) {
            $this->owner->removeElement($owner);
        }

        return $this;
    }
}
