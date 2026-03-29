<?php

namespace App\Http\Controllers;

use App\Models\Artigo;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreArtigoRequest;
use App\Http\Requests\UpdateArtigoRequest;

class ArtigoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreArtigoRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Artigo $artigo)
    {
        //
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
    public function update(UpdateArtigoRequest $request, Artigo $artigo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Artigo $artigo)
    {
        //
    }
}
