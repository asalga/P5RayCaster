/*
  Algorithms from lodev.org
  
  Andor Salga
  
  WORK IN PROGRESS
*/

int[][] worldMap = new int[][] {

    {1,1,1,1,1,1,1,1,1,1,1,1},
    {1,2,0,2,0,0,0,3,0,0,2,1},
    {1,3,0,0,0,0,0,0,0,0,0,1},
    {1,0,0,0,0,0,0,0,2,0,0,1},
    {1,3,0,0,3,0,0,0,0,0,0,1},
    {1,2,0,0,0,2,0,0,3,0,2,1},
    {1,1,1,1,1,1,1,1,1,1,1,1}
};

// 
PVector pos = new PVector(4, 4);
PVector dir = new PVector(0, 1);
PVector right = new PVector(1, 0);
float FOV = 0.6f;
int res = 1;
float walkSpeed = 4.0f;
float rot = 0.0f;
final float ROT_SPEED = 0.025f;

void setup() {
    size(400, 400,P2D);
    strokeCap(PROJECT);
}

void update(){
  if(Keyboard.isKeyDown(KEY_LEFT)){
    rot += ROT_SPEED;
  }
  if(Keyboard.isKeyDown(KEY_RIGHT)){
    rot -=ROT_SPEED;
  }
}

void draw() {
  update();
  
  console.log(floor(frameRate));
    background(0);

    //float rot = -frameCount / 400.0f;

    dir.x =  cos(rot) * 1;
    dir.y = -sin(rot) * 1;
    
    right.x = sin(rot) * 1;
    right.y = cos(rot) * 1;
    
 
    // For every vertical line on the viewport
    for (int x = 0; x < width; x += res) {

        float camX = 2.0f * x / float(width) - 1;
        PVector rayPos = new PVector(pos.x, pos.y);
        PVector rayDir = new PVector(dir.x + right.x * camX, dir.y + right.y * camX);

        int mapX = int(rayPos.x);
        int mapY = int(rayPos.y);

        float sideDistX;
        float sideDistY;

        float scaleX = 1.0 / rayDir.x;
        float scaleY = 1.0 / rayDir.y;

        // scale the vector by the inverse of the x component,
        // which makes the x component equal to one.
        // then calculate the magnitude
        float deltaDistX = (new PVector(1, rayDir.y * scaleX)).mag();
        float deltaDistY = (new PVector(1, rayDir.x * scaleY)).mag();

        float wallDist;

        int stepX;
        int stepY;

        int hit = 0;
        int side = 0;

        if (rayDir.x < 0) {
            stepX = -1;
            sideDistX = (rayPos.x - mapX) * deltaDistX;
        } else {
            stepX = 1;
            sideDistX = (mapX + 1.0 - rayPos.x) * deltaDistX;
        }

        if (rayDir.y < 0) {
            stepY = -1;
            sideDistY = (rayPos.y - mapY) * deltaDistY;
        } else {
            stepY = 1;
            sideDistY = (mapY + 1.0 - rayPos.y) * deltaDistY;
        }

        ////////////////////////////////////////////////////////////////
        // Search
        while (hit == 0) {
            if (sideDistX < sideDistY) {
                sideDistX += deltaDistX;
                mapX += stepX;
                side = 0;
            } else {
                sideDistY += deltaDistY;
                mapY += stepY;
                side = 1;
            }
            //if(mapX < 0 || mapY < 0){
            //  hit = 1;

            if (worldMap[mapX][mapY] > 0) {
                hit = 1;
            }
        }
        ////////////////////////////////////////////////////////////////

        //Calculate distance projected on camera direction (oblique distance will give fisheye effect!)
        if (side == 0){
            wallDist = abs((mapX - rayPos.x + (1.0 - stepX) / 2.0) / rayDir.x);
        }
        else{
            wallDist = abs((mapY - rayPos.y + (1.0 - stepY) / 2.0) / rayDir.y);
        }
        
        float lineHeight = abs(height / wallDist);

        if (mapX >= 0 && mapY >= 0) {
            switch (worldMap[mapX][mapY]) {
            case 0:
                break;
            case 1:
                stroke(255, 0, 0);
                break;
            case 2:
                stroke(0, 255, 0);
                break;
            case 3:
                stroke(0, 0, 255);
                break;
            }
        }

        if (side == 1) {
            switch (worldMap[mapX][mapY]) {
            case 1:
                stroke(255 / 2., 0, 0);
                break;
            case 2:
                stroke(0, 255 / 2., 0);
                break;
            case 3:
                stroke(0, 0, 255 / 2.);
                break;
            }
        }

        strokeWeight(res);
        // Center the line 
        float startY = height / 2 - lineHeight / 2;
        line(x, startY, x, startY + lineHeight);
    }
}

void keyReleased(){
  Keyboard.setKeyDown(keyCode, false);
}

void keyPressed(){
  Keyboard.setKeyDown(keyCode, true);
}

