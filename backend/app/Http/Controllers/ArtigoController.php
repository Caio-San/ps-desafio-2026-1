<?php

namespace App\Http\Controllers;

use App\Models\Artigo;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreArtigoRequest;
use App\Http\Requests\UpdateArtigoRequest;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Throwable;
use Illuminate\Support\Facades\Storage;

class ArtigoController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    protected Artigo $artigo;


    public function __construct(Artigo $artigo)
    {
        $this->artigo = $artigo;
    }

    public function index(): JsonResponse
    {
        $artigos = $this->artigo->with('category')->get();
        return response()->json($artigos, Response::HTTP_OK);
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
    public function store(StoreArtigoRequest $request): JsonResponse
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $data['image'] = url('storage/' . $path);
        }

        $artigo = $this->artigo->create($data);
        $id = $artigo->id;
        $artigo_category = $this->artigo->with('category')->findOrFail($id);
        return response()->json($artigo_category, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $artigo = $this->artigo->with('category')->findOrFail($id);
        return response()->json($artigo, Response::HTTP_OK);
    }
    

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Artigo $artigo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateArtigoRequest $request, $id): JsonResponse
    {
        $artigo = $this->artigo->with('category')->findOrFail($id);
        $data = $request->validated();

        if ($request->hasFile('image')) {
            try {
                $image_name = explode('artigos', $artigo['imagem']);
                Storage::disk('public')->delete('artigos/' . $image_name[1]);
            } catch (Throwable) {
            } finally {
                $path = $request->file('image')->store('artigos', 'public');
                $data['image'] = url('storage/' . $path);
            }
        }

        $artigo->update($data);

        return response()->json($artigo, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse

    {
        $artigo = $this->artigo->findOrFail($id);
        $artigo->delete();
        return response()->json(["message" => "Artigo deleted"]);
    }
}
