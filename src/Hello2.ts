import { ECS, S } from '@ir-engine/ecs'
import { PrimitiveGeometryComponent } from '@ir-engine/engine/src/scene/components/PrimitiveGeometryComponent'
import { GeometryTypeEnum } from '@ir-engine/engine/src/scene/constants/GeometryTypeEnum'
import { PhysicsSystem } from '@ir-engine/spatial'
import { NameComponent } from '@ir-engine/spatial/src/common/NameComponent'
import { VisibleComponent } from '@ir-engine/spatial/src/renderer/components/VisibleComponent'
import { TransformComponent } from '@ir-engine/spatial/src/transform/components/TransformComponent'
import { Vector3 } from 'three'

// Define our component
const HelloComponent = ECS.defineComponent({
  name: 'ee.hello-tutorial.HelloComponent',
  jsonID: 'EE_tutorial_hello',
  schema: S.Object({ initialized: S.Bool(false) })
})

// Define our query
const helloQuery = ECS.defineQuery([HelloComponent])

const execute = () => {
  for (const entity of helloQuery()) {
    const { initialized } = ECS.getComponent(entity, HelloComponent)
    if (initialized) continue

    ECS.getMutableComponent(entity, HelloComponent).initialized.set(true)

    ECS.setComponent(entity, NameComponent, 'hello-world')
    ECS.setComponent(entity, VisibleComponent)
    ECS.setComponent(entity, TransformComponent, { position: new Vector3(0, 1, 0) })
    ECS.setComponent(entity, PrimitiveGeometryComponent, { geometryType: GeometryTypeEnum.SphereGeometry })
  }
}

// Define our system
const HelloWorldSystem = ECS.defineSystem({
  uuid: 'helloworld.system',
  execute,
  insert: { after: PhysicsSystem }
})

export { HelloComponent, HelloWorldSystem }
