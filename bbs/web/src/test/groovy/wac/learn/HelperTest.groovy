//
// Generated from archetype; please customize.
//

package wac.learn

import wac.learn.Helper
import wac.learn.Example

/**
 * Tests for the {@link Helper} class.
 */
class HelperTest
    extends GroovyTestCase
{
    void testHelp() {
        new Helper().help(new Example())
    }
}
