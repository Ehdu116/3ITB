<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use App\Models\User;
use Laravel\Pail\ValueObjects\Origin\Console;
use Laravel\Prompts\Table;
use Illuminate\Support\Facades\Log;

class LoginController extends Controller
{
  /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

  use AuthenticatesUsers;

  /**
   * Where to redirect users after login.
   *
   * @var string
   */
  protected $redirectTo = '/home';

  /**
   * Create a new controller instance.
   *
   * @return void
   */
  public function __construct()
  {
    $this->middleware('guest')->except('logout');
    $this->middleware('auth')->only('logout');
  }

  public function apiLogin(Request $request)
  {
    $credentials = $request->only(['email', 'password']);

    if (!Auth::attempt($credentials)) {
      return response()->json(['message' => 'Invalid credentials'], 401);
    }

    $user = User::find(Auth::id());

    
    if ($user->role === 'user' || $user->role === 'admin') {
      $token = $user->createToken('auth_token')->plainTextToken;
      return response()->json(['token' => $token, 'role' => $user->role]);
    } else {
      return response()->json(['message' => 'User does not have a valid role'], 401);
    }
  }
}
