<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Developer;

class DeveloperController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        return Developer::latest()->paginate(15);
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
            'name' => 'required|string|max:191|unique:developers',
            'slug' => 'required|string|max:191',
            'desc' => 'required|string',
            'logo' => 'required|string',
        ]);


        if ($request->logo) {
            $name = time().'.' . explode('/', explode(':', substr($request->logo, 0, strpos
            ($request->logo, ';')))[1])[1];

            \Image::make($request->logo)->save(public_path('img/developer/').$name);

            $request->merge(['logo' => $name]);

        }


        return Developer::create([
            'name' => $request['name'],
            'slug' => $request['slug'],
            'desc' => $request['desc'],
            'logo' => $request['logo'],
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
