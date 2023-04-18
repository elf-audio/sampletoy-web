project(sampletoy_web)
cmake_minimum_required(VERSION 3.12)


set(CMAKE_CXX_STANDARD 17)

add_definitions(-std=c++17 -O3)
include_directories(src)
file(GLOB SOURCES src/*.cpp)

# set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)


add_executable(sampletoy_web ${SOURCES})


# Set custom emcc flags for compilation
target_compile_options(sampletoy_web PRIVATE
  -s WASM=1
  -std=c++17
  -O3
  # Add more flags here
)

set(CMAKE_VERBOSE_MAKEFILE on)

# Set custom emcc flags for linking
target_link_options(sampletoy_web PRIVATE
	-sSINGLE_FILE=1
	-sWASM=1
	-O3
	-sALLOW_MEMORY_GROWTH=1
	# watch out, no spaces must be in the array below between the items
	-sEXPORTED_FUNCTIONS=['_malloc','_free','_main']
	-sMODULARIZE=1
	-sWASM_ASYNC_COMPILATION=0
	--bind
	#   -o build/main.js
)


message(STATUS "Setting compilation target to WASM")
set(CMAKE_EXECUTABLE_SUFFIX ".wasm.js")
# set_target_properties(sampletoy_web PROPERTIES LINK_FLAGS "-s WASM=1 -s EXPORTED_FUNCTIONS='[_main]'")