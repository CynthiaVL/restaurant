<?php

namespace App\Controller;

use App\Entity\User;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\HttpFoundation\{JsonResponse, Request, Response};
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use OpenApi\Annotations as OA;
use OpenApi\Annotations\Response as OAResponse;
use OpenApi\Annotations\Property;
use OpenApi\Annotations\Post;
use OpenApi\Annotations\RequestBody;
use OpenApi\Annotations\JsonContent;
use OpenApi\Annotations\Items;

#[Route('/api', name: 'app_api_')]
class SecurityController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $manager,
        private SerializerInterface $serializer
    ){}
    #[Route('/registration', name: 'registration', methods: ['POST'])]
/*    #[OA\Post(
        path: "/api/registration",
        summary: "Inscription d'un nouvel utilisateur",
        requestBody: new OA\RequestBody(
            required: true,
            description: "Données de l'utilisateur à inscrire",
            content: new OA\JsonContent(
                type: "object",
                new OA\Property(property: "email", type: "string", example: "adresse@email.com"),
                new OA\Property(property: "password", type: "string", example: "Mot de passe")
            )
            ),
        responses: new OA\Response(
            response: "201",
            description: "Utilisateur inscrit avec succès",
            content: new OA\JsonContent(
                type: "object",
                new OA\Property(property: "user", type: "string", example: "Nom d'utilisateur"),
                new OA\Property(property: "apiToken", type: "string", example: "31a023e212f116124a36af14ea0c1c3806eb9378"),
                new OA\Property(property: "roles", type: "array", new OA\Items(type: "string", example: "ROLE_USER"))
            ))
    )],
*/

    public function register(Request $request, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        //serialiser
        $user = $this->serializer->deserialize($request->getContent(), User::class, 'json');
        $user->setPassword($passwordHasher->hashPassword($user, $user->getPassword()));
        $user->setCreatedAt(new DateTimeImmutable());

        $this->manager->persist($user);
        $this->manager->flush();
        return new JsonResponse(
            ['user'=> $user->getUserIdentifier(), 'apiToken' => $user->getApiToken(), 'role' => $user->getRoles()],
            Response::HTTP_CREATED);
    }
    #[Route('/login', name: 'login', methods: ['POST'])]
    public function login(#[CurrentUser] ?user $user): JsonResponse
    {
        if (!$user) {
            return new JsonResponse(['message' => 'Invalid credentials'], Response::HTTP_UNAUTHORIZED);
        }
        return new JsonResponse([
            'user'=> $user->getUserIdentifier(),
            'apiToken' => $user->getApiToken(),
            'role' => $user->getRoles()]);
    }
}