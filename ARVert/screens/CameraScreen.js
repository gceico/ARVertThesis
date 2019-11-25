import { AR } from 'expo/build/Expo';
import { Asset } from 'expo-asset/build/Asset'
import ExpoTHREE, { THREE, AR as ThreeAR } from 'expo-three';
import React from 'react';
import { View, Linking, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { View as GraphicsView } from 'expo-graphics';
import { connect } from "react-redux";
import { getAd, getModel } from "../actions/adActions";
import { getLocation } from "../actions/locationActions";
import Loader from "../components/Loader";
import CameraStyles from "../styles/CameraStyles";
import TextStyles from "../styles/TextStyles";
import Colors from "../constants/Colors";

class CameraScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = { showInfo: false };
    this.model = {};
  }


  async componentWillMount () {
    this._anchorsDidUpdate = AR.onAnchorsDidUpdate(({ anchors, eventType }) => {
      for (const anchor of anchors) {
        if (anchor.type === AR.AnchorType.Image) {
          this.handleImage(anchor, eventType);
        }
      }
    });
    this.props.getAd(props.detectedAd);
    this.props.getModel(props.detectedAd);
  }

  componentWillUnmount () {
    this._anchorsDidUpdate.remove();
  }

  handleImage = (anchor, eventType) => {
    const { transform } = anchor;
    if (!this.mesh) {
      return;
    }
    this.mesh.matrix.fromArray(transform);
    this.mesh.matrix.decompose(
      this.mesh.position,
      this.mesh.quaternion,
      this.mesh.scale
    );
    if (eventType === AR.AnchorEventType.Add) {
      this.mesh.visible = true;
      this.setState({ showInfo: true });
    } else if (eventType === AR.AnchorEventType.Remove) {
      this.mesh.visible = false;
      this.setState({ showInfo: false })
    } else if (eventType === AR.AnchorEventType.Update) {
    }
  };

  addDetectionImageAsync = async (resource, width = 0.254) => {
    let asset = Asset.fromModule(resource);
    await asset.downloadAsync();
    await AR.setDetectionImagesAsync({
      icon: {
        uri: asset.localUri,
        name: asset.name,
        width,
      },
    });
  };

  render () {
    if (!this.props.loading && this.props.ad.Name && !this.props.loadingModel) {
      return (
        <View style={{ flex: 1 }}>
          <GraphicsView
            style={{ flex: 1 }}
            onContextCreate={this.onContextCreate}
            onRender={this.onRender}
            onResize={this.onResize}
            arTrackingConfiguration={AR.TrackingConfiguration.World}
            isArEnabled
            isArRunningStateEnabled
            isArCameraStateEnabled
          />
          <View
            style={{
              position: 'absolute',
              alignItems: 'stretch',
              justifyContent: 'flex-end',
              top: 32,
              right: 16,
              opacity: 0.5,
              width: '30%',
            }}>
            <Text style={TextStyles.body}>Point the camera at this image.</Text>
            <Image
              source={{ uri: this.props.ad.PathMarker }}
              style={{ maxWidth: '100%', height: 100, resizeMode: 'contain' }}
            />
          </View>
          {this.state.showInfo &&
          <AdInfo ad={this.props.ad}/>
          }
        </View>
      );
    }
    {
      return (
        <Loader/>
      )
    }
  }

  onContextCreate = async ({ gl, scale: pixelRatio, width, height }) => {
    AR.setPlaneDetection(AR.PlaneDetection.Horizontal);

    await this.addDetectionImageAsync(this.props.ad.PathMarker);

    this.renderer = new ExpoTHREE.Renderer({ gl, pixelRatio, width, height });
    this.renderer.gammaInput = this.renderer.gammaOutput = true;
    this.renderer.shadowMap.enabled = true;

    this.scene = new THREE.Scene();
    this.scene.background = new ThreeAR.BackgroundTexture(this.renderer);

    this.camera = new ThreeAR.Camera(width, height, 0.01, 1000);

    await this.loadModel();

    this.ambient = new ThreeAR.Light();
    this.mesh.add(this.ambient);
    this.mesh.add(this.shadow);
    this.mesh.add(this.point);
  };

  loadModel = async () => {
    try {
      const model = await ExpoTHREE.loadDaeAsync({
        asset: this.props.daePath,
        onAssetRequested: this.props.model
      });


      console.log(model, 'model');
      const { scene: mesh, animations } = model;
      // const { scene: mesh } = model;

      mesh.traverse(child => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      mesh.castShadow = true;

      ExpoTHREE.utils.scaleLongestSideToSize(mesh, 0.1);

      if (animations) {
        this.mixer = new THREE.AnimationMixer(mesh);
        this.mixer.clipAction(animations[0]).play();
      }
      const geometry = new THREE.PlaneBufferGeometry(1, 1, 32, 32);
      const material = new THREE.ShadowMaterial();
      material.opacity = 0.7;
      const plane = new THREE.Mesh(geometry, material);
      plane.receiveShadow = true;
      plane.rotation.x = -Math.PI / 2;

      let _mesh = new THREE.Object3D();

      _mesh.add(mesh);
      _mesh.add(plane);
      this.mesh = _mesh; // Save reference for rotation
      this.scene.add(this.mesh);
      this.mesh.visible = false;
    } catch (e) {
      console.log(e, 'err')
    }
  };

  onResize = ({ x, y, scale, width, height }) => {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(scale);
    this.renderer.setSize(width, height);
  };

  onRender = delta => {
    if (this.mixer && this.mesh.visible) {
      this.mixer.update(delta);
    }
    this.ambient.update();
    this.renderer.render(this.scene, this.camera);
  };

  get point () {
    const light = new THREE.PointLight(0xffffff);
    light.position.set(2, 2, 2);
    return light;
  }

  get shadow () {
    let light = new THREE.DirectionalLight(0xffffff, 0.6);

    light.position.set(0, 0.5, 0.1);
    light.castShadow = true;

    const shadowSize = 0.05;
    light.shadow.camera.left *= shadowSize;
    light.shadow.camera.right *= shadowSize;
    light.shadow.camera.top *= shadowSize;
    light.shadow.camera.bottom *= shadowSize;
    light.shadow.camera.near = 0.01;
    light.shadow.camera.far = 100;

    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;

    return light;
  }
}

class AdInfo extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isOpen: true
    }
  }

  render () {
    if (this.state.isOpen) {
      return (
        <View style={[CameraStyles.adContainer, styles.adContainer]}>
          <View style={CameraStyles.adHeading}>
            <TouchableOpacity onPress={() => Linking.openURL(this.props.ad.Link)}>
              <Text style={[TextStyles.caption, TextStyles.defaultLink, {
                color: Colors.linkColor,
                textAlign: 'left',
                fontFamily: 'roboto-bold'
              }]}>
                {this.props.ad.Name}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ isOpen: false })}>
              <Text style={[TextStyles.label, TextStyles.defaultLink, { color: Colors.errorBackground }]}>Dismiss</Text>
            </TouchableOpacity>
          </View>
          <View style={[CameraStyles.adBody]}>
            <Text style={TextStyles.body}>{this.props.ad.Text}</Text>
          </View>
        </View>
      )
    } else {
      return null
    }
  }
}

CameraScreen.navigationOptions = {
  header: null,
  headerMode: 'none',
};

export const CameraScreenWithRedux = connect(state => ({ ...state.adReducer }), {
  getAd,
  getLocation,
  getModel
})(CameraScreen);

const styles = StyleSheet.create({
  adContainer: {
    position: 'absolute',
    bottom: 8,
    left: 16
  }
});