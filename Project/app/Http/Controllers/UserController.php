<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();

        $sortFields = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }

        if (request('email')) {
            $query->where('email', 'like', '%' . request('email') . '%');
        }

       


        $users = $query->orderBy($sortFields, $sortDirection)
        ->paginate(10)
        ->onEachSide(1);

        return inertia("User/Index", [
            "users" => UserResource::collection($users),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
