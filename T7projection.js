function getWorldToViewingMatrix3D(p0, pref)
{
  // Build View-Normal Vector
  var N = [];
  for (var i=0; i<4; i++)
  {
    N[i] = p0[i] - pref[i];
  }

  // Define View-Up Vector
  V = [0.0, 1.0, 0.0, 0.0];

  // Compute u, v, n unit vectors
  var magN = magnitude(N);
  var n = [];
  for (var i=0; i<4; i++)
  {
    n[i] = N[i]/magN;
  }
  var u = crossProduct(V, n);
  var magu = magnitude(u);
  for (var i=0; i<4; i++)
  {
    u[i] = u[i]/magu;
  }
  var v = crossProduct(n, u);

  var T = [ [1, 0, 0, -1.0 * p0[0] ],
            [0, 1, 0, -1.0 * p0[1] ],
            [0, 0, 1, -1.0 * p0[2] ],
            [0, 0, 0, 1 ]            ];

  var R = [ [u[0], u[1], u[2], 0],
            [v[0], v[1], v[2], 0],
            [n[0], n[1], n[2], 0],
            [0, 0, 0, 1           ]  ];

  return MatrixMultiply3D(R, T);
}


function getParallelProjectionMatrix(VP, zvp)
{
  return [  [1, 0, -1.0*VP[0]/VP[2], zvp*VP[0]/VP[2] ],
            [0, 1, -1.0*VP[1]/VP[2], zvp*VP[1]/VP[2] ],
            [0, 0, 1, 0],
            [0, 0, 0, 1]  ]; 
}

function getPerspectiveProjectionMatrix(prp, zvp)
{
  return [  [prp[2]-zvp, 0, -1*prp[0], prp[0]*prp[2] ],
            [0, prp[2]-zvp, -1*prp[1], prp[1]*prp[2] ],
            [0, 0, 1, 0],
            [0, 0, -1, prp[2]]  ]; 
}

function visibleFace(p1, p2, p3, p4)
{
  var x1 = p1[0];
  var y1 = p1[1];
  var z1 = p1[2];
  var x2 = p2[0];
  var y2 = p2[1];
  var z2 = p2[2];
  var x3 = p3[0];
  var y3 = p3[1];
  var z3 = p3[2];
  return ( (x1*(y2-y3) + x2*(y3-y1) + x3*(y1-y2)) > 0 )
}