<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Location;

class LocationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }


    public function index()
    {
        return Location::latest()->paginate(200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string|max:191',
            'slug' => 'required|string|max:191',
            'description' => 'required',
        ]);
        return Location::create([
            'name' => $request['name'],
            'slug' => $request['slug'],
            'description' => $request['description'],
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $location = Location::findOrFail($id);

        $this->validate($request, [
            'name' => 'required|string|max:191',
            'slug' => 'required|string|max:191|unique:locations,slug,'.$location->id,
            'description' => 'required|string',
        ]);

        $location->update([
            'name'=>$request['name'],
            'slug'=>$request['slug'],
            'description'=>$request['description'],
            ]);

        //return $id;
        return ['message' => 'Location Updated'];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->authorize('isAdmin');

        $location = Location::FindOrFail($id);

        // delete location
        $location->delete();

        // redirect
        return ['message' => 'Location Deleted'];
    }
}
