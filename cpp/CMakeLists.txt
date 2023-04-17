project(sampletoy_web)
cmake_minimum_required(VERSION 3.12)


set(CMAKE_CXX_STANDARD 17)

add_definitions(-std=c++17 -O3)
include_directories(src)
file(GLOB SOURCES src/*.cpp)

set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)


add_executable(sampletoy_web ${SOURCES})

message(STATUS "Setting compilation target to WASM")
set(CMAKE_EXECUTABLE_SUFFIX ".wasm.js")
set_target_properties(sampletoy_web PROPERTIES LINK_FLAGS "-s WASM=1 -s EXPORTED_FUNCTIONS='[_main]'")