<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Controllers\Controller;
use App\Http\Requests\StorecategoryRequest;
use App\Http\Requests\UpdatecategoryRequest;
use Illuminate\Http\Resources\Json\JsonResource;
use Nette\Utils\Json;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class CategoryController extends Controller
{
    protected Category $category;

    /**
     * Display a listing of the resource.
     */

    public function __construct(Category $category)
    {
        $this->category = $category;
    }


    public function index(): JsonResponse
    {
        $categories = $this->category->all();
        return response()->json($categories, Response::HTTP_OK);
    }

    /**
     * Show the form for creating a new resource.
     */
    
    public function store(StorecategoryRequest $request): JsonResponse
    {
        $data = $request->validated();
        $category = $this->category->create($data);
        return response()->json($category, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $category = $this->category->findOrFail($id);
        return response()->json($category, Response::HTTP_OK);
    }

    
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatecategoryRequest $request, $id): JsonResponse
    {
        $category = $this->category->findOrFail($id);
        $data = $request->validated();
        $category->update($data);
        return response()->json($category, Response::HTTP_OK);
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        $category = $this->category->findOrFail($id);
        $category->delete();
        return response()->json(["message" => "Category deleteda"]);
    }
}